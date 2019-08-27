/* 使用方法
创建一个控制对象
var factory = new $.OSSUploadFactory({
  subSystem: 2,
  unmountHook: function () {
    $('preview').remove()
  }
})
监听文件
$('input').on('change', function(e) {
  factory.mount(e.target.files[0], $('preview'))
})
监听删除
$('delete').on('click', function(e) {
  var key = $('preview').data('oss')
  factory.unmount(key)
})
监听上传
$('upload').on('click', function(e) {
  var key = $('preview').data('oss')
  var uploader = factory.getUploaderByKey(key)
  uploader.upload()
})
*/
/**
 * ali oss adapter
 * 2018 3.5
 * author zzy
 */
(function() {
  /**
   * 上传文件构造器
   * @param filePlus file扩展对象
   * @constructor
   */
  function OSSUploader(filePlus) {
    // 缓存oss client
    this.uploadFileClient = null;
    // 断点续传记录点
    this.breakpoint = null;
    // 重试计数
    this.retryCount = 0;
    // 最大重试次数
    this.retryCountMax = 3;
    this.isCancel = false;
    this.filePlus = filePlus;
    this.applySts();
  }

  OSSUploader.STS_URL = '/common/fileSts.htm';

  /**
   * 请求sts获取token
   */
  OSSUploader.prototype.applySts = function() {
    var _this = this;
    var filePlus = _this.filePlus;
    var def = $.Deferred();
    var stsUrl = OSSUploadFactory.STS_URL;
    if (!_this.uploadFileClient) {
      $.ajax({
        url: stsUrl,
      }).then(function(res) {
        if (res.data.errorMsg) {
          console.error(res.data.errorMsg);
          def.reject(res.data.errorMsg);
        } else {
          var policyInf = res.data.policyInf;
          var fileList = res.data.fileList;
          genFilePlus(filePlus, function() {
            var ret = {
              policyInf: policyInf,
              fileList: fileList,
              fileUuid: fileList[0].fileUuid,
              fileKey: fileList[0].fileKey,
              uuid: '' + filePlus.fileUuid + filePlus.fileIcon.toLowerCase(),
              fileBody: {
                fileKey: filePlus.uuid,
                fileSize: filePlus.fileSize,
                fileMd5: filePlus.MD5,
                fileId: fileList[0].fileUuid,
              },
            };
            if (fileList[0].fileKey) {
              ret.isUploaded = true;
            }
            return ret;
          });
          _this.uploadFileClient = new OSS({
            region: 'oss-cn-hangzhou',
            accessKeyId: policyInf.accessKeyId,
            accessKeySecret: policyInf.accessKeySecret,
            stsToken: policyInf.securityToken,
            bucket: policyInf.bucket,
            timeout: 180000000,
          });
          def.resolve();
        }
      });
    }
    return def;
  };

  /**
   * 上传文件执行函数
   */
  OSSUploader.prototype.uploadFile = function() {
    var _this = this;
    var filePlus = _this.filePlus;
    var key = filePlus.uuid;

    const options = {
      progress: function(p, checkpoint) {
        _this.breakpoint = checkpoint;
        // TODO
      },
      partSize: 50 * 100 * 1024,
      timeout: 60000,
      parallel: 20,
      callback: {
        url: filePlus.fileConfig.callBackUrl,
        body: JSON.stringify(filePlus.fileBody),
        contentType: 'application/json',
      },
    };
    if (_this.breakpoint) {
      options.checkpoint = _this.breakpoint;
    }
    return _this.uploadFileClient
      .multipartUpload(key, filePlus.sourceFile, options)
      .then(function(res) {
        console.log('upload success: %j', res);
        _this.breakpoint = null;
        _this.uploadFileClient = null;
      })
      .catch(function(err) {
        if (_this.uploadFileClient && _this.uploadFileClient.isCancel()) {
          console.log('stop-upload!');
        } else {
          if (err.name.toLowerCase().indexOf('connectiontimeout') !== -1) {
            // timeout retry
            if (_this.retryCount < _this.retryCountMax) {
              _this.retryCount++;
              _this.uploadFile();
            }
          }
        }
      });
  };

  /**
   * 上传文件管理构造器
   * @param config.unmountHook 卸载回调函数
   * @param config.subSystem
   * @constructor
   */
  function OSSUploadFactory(config) {
    this.uploaders = {};
    this.fileConfig = null;
    this.config = config;
    this.applyFileConfig();
  }

  OSSUploadFactory.FILE_CONFIG_URL = '/common/uploadFileConfig.htm';

  /**
   * 挂载一个上传实例
   * @param file 文件本体
   * @param targetElm dom目标对象
   * @returns {string}
   */
  OSSUploadFactory.prototype.mount = function(file, targetElm) {
    var _this = this;
    var filePlus = genFilePlus(
      file,
      {
        targetElm: targetElm,
        fileConfig: _this.fileConfig,
      },
      true,
    );
    var key = genUUID();
    computeMD5(filePlus).then(function() {
      _this.uploaders[key] = new OSSUploader(filePlus);
    });
    targetElm.data('oss', key);
    return key;
  };

  /**
   * 卸载一个上传实例
   * @param key
   */
  OSSUploadFactory.prototype.unmount = function(key) {
    var _this = this;
    _this.config.unmountHook();
    delete _this.uploaders[key];
  };

  /**
   * 获取指定uploader
   * @param key
   * @returns {*}
   */
  OSSUploadFactory.prototype.getUploaderByKey = function(key) {
    var _this = this;
    return _this.uploaders[key];
  };
  /**
   * 获取文件配置
   */
  OSSUploadFactory.prototype.applyFileConfig = function() {
    var _this = this;
    var fileConfigUrl = OSSUploadFactory.FILE_CONFIG_URL;
    var subSystem = _this.config.subSystem;
    $.ajax({
      url: fileConfigUrl,
      data: {
        subSystem: subSystem,
      },
    }).then(function(res) {
      if (res.data.errorMsg) {
        console.error(res.data.errorMsg);
      } else {
        _this.fileConfig = res.data;
      }
    });
  };

  /**
   * 扩展file对象
   * @param file 文件本体
   * @param ext 自定义扩展
   * @param first 是否第一次扩展
   */
  function genFilePlus(file, ext, first) {
    var _this = this;
    var filePlus = file;
    if (first) {
      var icon = genFileIcon(file.name);
      var type = file.type || icon;
      if (icon === 'pbim') {
        type = 'pbim';
      }
      filePlus = {
        id: Math.random()
          .toString(36)
          .substr(2),
        chunkList: [],
        progress: 0,
        fileKey: '',
        progressMD5: 0,
        speed: 0,
        error: '',
        success: false,
        isPause: false,
        response: {},
        fileList: [],
        doneParts: [],
        policyInf: {},
        blob: genFileBold(file),
        fileName: file.name,
        fileSize: file.size,
        fileType: genFileType(file),
        fileIcon: icon,
        fileMine: type,
        playTime: file.playTime || '',
        picRadio: file.picRadio || '',
        uuid: '',
        sourceFile: file,
        fileConfig: _this.fileConfig,
      };
    }
    if (ext) {
      ext = typeof ext === 'function' ? ext() : ext;
      $.extend(filePlus, ext);
    }
    return filePlus;
  }

  /**
   * 生成uuid
   * @returns {string}
   */
  function genUUID() {
    return 'xxxxxxxxyyyyyyyy'.replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  function genFileType(file) {
    var name = file.name.toLowerCase();
    if (/\.(gif|jpg|jpeg|png)$/.test(name)) {
      return 1;
    }
    if (/\.(wav|flav|ape|alac|mp3|JPaavG|ogg|opus)$/.test(name)) {
      return 2;
    }
    if (/\.(mpeg|avi|mov|asf|wmv|nvai|3gp|ra|ram|mkv|flv|f4v|rmvb|webm|mp4)$/.test(name)) {
      return 3;
    }
    return 4;
  }

  function genFileBold(file) {
    if (file.type.substr(0, 6) === 'image/') {
      var URL = window.URL || window.webkitURL;
      if (URL && URL.createObjectURL) {
        return URL.createObjectURL(file);
      }
    }
  }

  function genFileIcon(name) {
    return name.slice(name.lastIndexOf('.') + 1).toLowerCase();
  }

  /**
   * 计算文件的MD5
   * @param filePlus
   */
  function computeMD5(filePlus) {
    var def = $.Deferred();
    var fileReader = new FileReader();
    var blobSlice = File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice;
    var sparkChunkSize = 5242880;
    var sparkChunks = Math.ceil(filePlus.sourceFile.size / sparkChunkSize);
    var currentChunk = 0;
    fileReader.onload = function(e) {
      var spark = new SparkMD5.ArrayBuffer();
      genFilePlus(filePlus, {
        progressMD5: ((currentChunk + 1) / sparkChunks) * 100,
      });
      spark.append(e.target.result);
      currentChunk++;
      if (currentChunk < sparkChunks) {
        loadNext();
      } else {
        genFilePlus(filePlus, {
          MD5: spark.end(),
        });
        def.resolve();
      }
    };
    var loadNext = function() {
      var start = currentChunk * sparkChunkSize;
      var end =
        start + sparkChunkSize >= filePlus.sourceFile.size
          ? filePlus.sourceFile.size
          : start + sparkChunkSize;
      fileReader.readAsArrayBuffer(blobSlice.call(filePlus.sourceFile, start, end));
    };
    loadNext();
    return def;
  }

  $.OSSUploadFactory = OSSUploadFactory;
})();
