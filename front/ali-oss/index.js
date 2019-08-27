(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "1452a72e8ee650028afa";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "ali-oss/index";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/demos/front/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/ali-oss/index.js")(__webpack_require__.s = "./src/ali-oss/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ali-oss/index.js":
/*!******************************!*\
  !*** ./src/ali-oss/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

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
(function () {
  /**
   * 上传文件构造器
   * @param filePlus file扩展对象
   * @constructor
   */
  function OSSUploader(filePlus) {
    // 缓存oss client
    this.uploadFileClient = null; // 断点续传记录点

    this.breakpoint = null; // 重试计数

    this.retryCount = 0; // 最大重试次数

    this.retryCountMax = 3;
    this.isCancel = false;
    this.filePlus = filePlus;
    this.applySts();
  }

  OSSUploader.STS_URL = '/common/fileSts.htm';
  /**
   * 请求sts获取token
   */

  OSSUploader.prototype.applySts = function () {
    var _this = this;

    var filePlus = _this.filePlus;
    var def = $.Deferred();
    var stsUrl = OSSUploadFactory.STS_URL;

    if (!_this.uploadFileClient) {
      $.ajax({
        url: stsUrl
      }).then(function (res) {
        if (res.data.errorMsg) {
          console.error(res.data.errorMsg);
          def.reject(res.data.errorMsg);
        } else {
          var policyInf = res.data.policyInf;
          var fileList = res.data.fileList;
          genFilePlus(filePlus, function () {
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
                fileId: fileList[0].fileUuid
              }
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
            timeout: 180000000
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


  OSSUploader.prototype.uploadFile = function () {
    var _this = this;

    var filePlus = _this.filePlus;
    var key = filePlus.uuid;
    var options = {
      progress: function progress(p, checkpoint) {
        _this.breakpoint = checkpoint; // TODO
      },
      partSize: 50 * 100 * 1024,
      timeout: 60000,
      parallel: 20,
      callback: {
        url: filePlus.fileConfig.callBackUrl,
        body: JSON.stringify(filePlus.fileBody),
        contentType: 'application/json'
      }
    };

    if (_this.breakpoint) {
      options.checkpoint = _this.breakpoint;
    }

    return _this.uploadFileClient.multipartUpload(key, filePlus.sourceFile, options).then(function (res) {
      console.log('upload success: %j', res);
      _this.breakpoint = null;
      _this.uploadFileClient = null;
    }).catch(function (err) {
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

  OSSUploadFactory.prototype.mount = function (file, targetElm) {
    var _this = this;

    var filePlus = genFilePlus(file, {
      targetElm: targetElm,
      fileConfig: _this.fileConfig
    }, true);
    var key = genUUID();
    computeMD5(filePlus).then(function () {
      _this.uploaders[key] = new OSSUploader(filePlus);
    });
    targetElm.data('oss', key);
    return key;
  };
  /**
   * 卸载一个上传实例
   * @param key
   */


  OSSUploadFactory.prototype.unmount = function (key) {
    var _this = this;

    _this.config.unmountHook();

    delete _this.uploaders[key];
  };
  /**
   * 获取指定uploader
   * @param key
   * @returns {*}
   */


  OSSUploadFactory.prototype.getUploaderByKey = function (key) {
    var _this = this;

    return _this.uploaders[key];
  };
  /**
   * 获取文件配置
   */


  OSSUploadFactory.prototype.applyFileConfig = function () {
    var _this = this;

    var fileConfigUrl = OSSUploadFactory.FILE_CONFIG_URL;
    var subSystem = _this.config.subSystem;
    $.ajax({
      url: fileConfigUrl,
      data: {
        subSystem: subSystem
      }
    }).then(function (res) {
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
        id: Math.random().toString(36).substr(2),
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
        fileConfig: _this.fileConfig
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
    return 'xxxxxxxxyyyyyyyy'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
          v = c === 'x' ? r : r & 0x3 | 0x8;
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

    fileReader.onload = function (e) {
      var spark = new SparkMD5.ArrayBuffer();
      genFilePlus(filePlus, {
        progressMD5: (currentChunk + 1) / sparkChunks * 100
      });
      spark.append(e.target.result);
      currentChunk++;

      if (currentChunk < sparkChunks) {
        loadNext();
      } else {
        genFilePlus(filePlus, {
          MD5: spark.end()
        });
        def.resolve();
      }
    };

    var loadNext = function loadNext() {
      var start = currentChunk * sparkChunkSize;
      var end = start + sparkChunkSize >= filePlus.sourceFile.size ? filePlus.sourceFile.size : start + sparkChunkSize;
      fileReader.readAsArrayBuffer(blobSlice.call(filePlus.sourceFile, start, end));
    };

    loadNext();
    return def;
  }

  $.OSSUploadFactory = OSSUploadFactory;
})();

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9zcmMvYWxpLW9zcy9pbmRleC5qcyJdLCJuYW1lcyI6WyJPU1NVcGxvYWRlciIsImZpbGVQbHVzIiwidXBsb2FkRmlsZUNsaWVudCIsImJyZWFrcG9pbnQiLCJyZXRyeUNvdW50IiwicmV0cnlDb3VudE1heCIsImlzQ2FuY2VsIiwiYXBwbHlTdHMiLCJTVFNfVVJMIiwicHJvdG90eXBlIiwiX3RoaXMiLCJkZWYiLCIkIiwiRGVmZXJyZWQiLCJzdHNVcmwiLCJPU1NVcGxvYWRGYWN0b3J5IiwiYWpheCIsInVybCIsInRoZW4iLCJyZXMiLCJkYXRhIiwiZXJyb3JNc2ciLCJjb25zb2xlIiwiZXJyb3IiLCJyZWplY3QiLCJwb2xpY3lJbmYiLCJmaWxlTGlzdCIsImdlbkZpbGVQbHVzIiwicmV0IiwiZmlsZVV1aWQiLCJmaWxlS2V5IiwidXVpZCIsImZpbGVJY29uIiwidG9Mb3dlckNhc2UiLCJmaWxlQm9keSIsImZpbGVTaXplIiwiZmlsZU1kNSIsIk1ENSIsImZpbGVJZCIsImlzVXBsb2FkZWQiLCJPU1MiLCJyZWdpb24iLCJhY2Nlc3NLZXlJZCIsImFjY2Vzc0tleVNlY3JldCIsInN0c1Rva2VuIiwic2VjdXJpdHlUb2tlbiIsImJ1Y2tldCIsInRpbWVvdXQiLCJyZXNvbHZlIiwidXBsb2FkRmlsZSIsImtleSIsIm9wdGlvbnMiLCJwcm9ncmVzcyIsInAiLCJjaGVja3BvaW50IiwicGFydFNpemUiLCJwYXJhbGxlbCIsImNhbGxiYWNrIiwiZmlsZUNvbmZpZyIsImNhbGxCYWNrVXJsIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJjb250ZW50VHlwZSIsIm11bHRpcGFydFVwbG9hZCIsInNvdXJjZUZpbGUiLCJsb2ciLCJjYXRjaCIsImVyciIsIm5hbWUiLCJpbmRleE9mIiwiY29uZmlnIiwidXBsb2FkZXJzIiwiYXBwbHlGaWxlQ29uZmlnIiwiRklMRV9DT05GSUdfVVJMIiwibW91bnQiLCJmaWxlIiwidGFyZ2V0RWxtIiwiZ2VuVVVJRCIsImNvbXB1dGVNRDUiLCJ1bm1vdW50IiwidW5tb3VudEhvb2siLCJnZXRVcGxvYWRlckJ5S2V5IiwiZmlsZUNvbmZpZ1VybCIsInN1YlN5c3RlbSIsImV4dCIsImZpcnN0IiwiaWNvbiIsImdlbkZpbGVJY29uIiwidHlwZSIsImlkIiwiTWF0aCIsInJhbmRvbSIsInRvU3RyaW5nIiwic3Vic3RyIiwiY2h1bmtMaXN0IiwicHJvZ3Jlc3NNRDUiLCJzcGVlZCIsInN1Y2Nlc3MiLCJpc1BhdXNlIiwicmVzcG9uc2UiLCJkb25lUGFydHMiLCJibG9iIiwiZ2VuRmlsZUJvbGQiLCJmaWxlTmFtZSIsInNpemUiLCJmaWxlVHlwZSIsImdlbkZpbGVUeXBlIiwiZmlsZU1pbmUiLCJwbGF5VGltZSIsInBpY1JhZGlvIiwiZXh0ZW5kIiwicmVwbGFjZSIsImMiLCJyIiwidiIsInRlc3QiLCJVUkwiLCJ3aW5kb3ciLCJ3ZWJraXRVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJzbGljZSIsImxhc3RJbmRleE9mIiwiZmlsZVJlYWRlciIsIkZpbGVSZWFkZXIiLCJibG9iU2xpY2UiLCJGaWxlIiwibW96U2xpY2UiLCJ3ZWJraXRTbGljZSIsInNwYXJrQ2h1bmtTaXplIiwic3BhcmtDaHVua3MiLCJjZWlsIiwiY3VycmVudENodW5rIiwib25sb2FkIiwiZSIsInNwYXJrIiwiU3BhcmtNRDUiLCJBcnJheUJ1ZmZlciIsImFwcGVuZCIsInRhcmdldCIsInJlc3VsdCIsImxvYWROZXh0IiwiZW5kIiwic3RhcnQiLCJyZWFkQXNBcnJheUJ1ZmZlciIsImNhbGwiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLGVBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUE2QjtBQUM3QixxQ0FBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQXFCLGdCQUFnQjtBQUNyQztBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLDZCQUFxQixnQkFBZ0I7QUFDckM7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxhQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwwQkFBa0IsOEJBQThCO0FBQ2hEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxlQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFD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Iiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IGZhY3RvcnkoKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHdpbmRvdywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0ZnVuY3Rpb24gaG90RGlzcG9zZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0ZGVsZXRlIGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdH1cbiBcdHZhciBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayA9IHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl07XG4gXHR3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdID0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0XHRpZiAocGFyZW50SG90VXBkYXRlQ2FsbGJhY2spIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdH0gO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiBcdFx0c2NyaXB0LmNoYXJzZXQgPSBcInV0Zi04XCI7XG4gXHRcdHNjcmlwdC5zcmMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgY2h1bmtJZCArIFwiLlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzXCI7XG4gXHRcdGlmIChudWxsKSBzY3JpcHQuY3Jvc3NPcmlnaW4gPSBudWxsO1xuIFx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRNYW5pZmVzdChyZXF1ZXN0VGltZW91dCkge1xuIFx0XHRyZXF1ZXN0VGltZW91dCA9IHJlcXVlc3RUaW1lb3V0IHx8IDEwMDAwO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0aWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCA9PT0gXCJ1bmRlZmluZWRcIikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChuZXcgRXJyb3IoXCJObyBicm93c2VyIHN1cHBvcnRcIikpO1xuIFx0XHRcdH1cbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0dmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiBcdFx0XHRcdHZhciByZXF1ZXN0UGF0aCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNvblwiO1xuIFx0XHRcdFx0cmVxdWVzdC5vcGVuKFwiR0VUXCIsIHJlcXVlc3RQYXRoLCB0cnVlKTtcbiBcdFx0XHRcdHJlcXVlc3QudGltZW91dCA9IHJlcXVlc3RUaW1lb3V0O1xuIFx0XHRcdFx0cmVxdWVzdC5zZW5kKG51bGwpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChlcnIpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0aWYgKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkgcmV0dXJuO1xuIFx0XHRcdFx0aWYgKHJlcXVlc3Quc3RhdHVzID09PSAwKSB7XG4gXHRcdFx0XHRcdC8vIHRpbWVvdXRcbiBcdFx0XHRcdFx0cmVqZWN0KFxuIFx0XHRcdFx0XHRcdG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIHRpbWVkIG91dC5cIilcbiBcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDQwNCkge1xuIFx0XHRcdFx0XHQvLyBubyB1cGRhdGUgYXZhaWxhYmxlXG4gXHRcdFx0XHRcdHJlc29sdmUoKTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgIT09IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyAhPT0gMzA0KSB7XG4gXHRcdFx0XHRcdC8vIG90aGVyIGZhaWx1cmVcbiBcdFx0XHRcdFx0cmVqZWN0KG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIGZhaWxlZC5cIikpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0Ly8gc3VjY2Vzc1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdHZhciB1cGRhdGUgPSBKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xuIFx0XHRcdFx0XHRcdHJlamVjdChlKTtcbiBcdFx0XHRcdFx0XHRyZXR1cm47XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0cmVzb2x2ZSh1cGRhdGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHR2YXIgaG90QXBwbHlPblVwZGF0ZSA9IHRydWU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50SGFzaCA9IFwiMTQ1MmE3MmU4ZWU2NTAwMjhhZmFcIjtcbiBcdHZhciBob3RSZXF1ZXN0VGltZW91dCA9IDEwMDAwO1xuIFx0dmFyIGhvdEN1cnJlbnRNb2R1bGVEYXRhID0ge307XG4gXHR2YXIgaG90Q3VycmVudENoaWxkTW9kdWxlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IFtdO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIG1lID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdGlmICghbWUpIHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fO1xuIFx0XHR2YXIgZm4gPSBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gXHRcdFx0aWYgKG1lLmhvdC5hY3RpdmUpIHtcbiBcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdKSB7XG4gXHRcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLnB1c2gobW9kdWxlSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHJlcXVlc3Q7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobWUuY2hpbGRyZW4uaW5kZXhPZihyZXF1ZXN0KSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0bWUuY2hpbGRyZW4ucHVzaChyZXF1ZXN0KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArXG4gXHRcdFx0XHRcdFx0cmVxdWVzdCArXG4gXHRcdFx0XHRcdFx0XCIpIGZyb20gZGlzcG9zZWQgbW9kdWxlIFwiICtcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0KTtcbiBcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHJlcXVlc3QpO1xuIFx0XHR9O1xuIFx0XHR2YXIgT2JqZWN0RmFjdG9yeSA9IGZ1bmN0aW9uIE9iamVjdEZhY3RvcnkobmFtZSkge1xuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX19bbmFtZV07XG4gXHRcdFx0XHR9LFxuIFx0XHRcdFx0c2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuIFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdID0gdmFsdWU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fTtcbiBcdFx0Zm9yICh2YXIgbmFtZSBpbiBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKF9fd2VicGFja19yZXF1aXJlX18sIG5hbWUpICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcImVcIiAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJ0XCJcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgbmFtZSwgT2JqZWN0RmFjdG9yeShuYW1lKSk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGZuLmUgPSBmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJyZWFkeVwiKSBob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdGhvdENodW5rc0xvYWRpbmcrKztcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5lKGNodW5rSWQpLnRoZW4oZmluaXNoQ2h1bmtMb2FkaW5nLCBmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdGZpbmlzaENodW5rTG9hZGluZygpO1xuIFx0XHRcdFx0dGhyb3cgZXJyO1xuIFx0XHRcdH0pO1xuXG4gXHRcdFx0ZnVuY3Rpb24gZmluaXNoQ2h1bmtMb2FkaW5nKCkge1xuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZy0tO1xuIFx0XHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIpIHtcbiBcdFx0XHRcdFx0aWYgKCFob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoaG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJiBob3RXYWl0aW5nRmlsZXMgPT09IDApIHtcbiBcdFx0XHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH07XG4gXHRcdGZuLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRcdGlmIChtb2RlICYgMSkgdmFsdWUgPSBmbih2YWx1ZSk7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18udCh2YWx1ZSwgbW9kZSAmIH4xKTtcbiBcdFx0fTtcbiBcdFx0cmV0dXJuIGZuO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgaG90ID0ge1xuIFx0XHRcdC8vIHByaXZhdGUgc3R1ZmZcbiBcdFx0XHRfYWNjZXB0ZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9kZWNsaW5lZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X3NlbGZBY2NlcHRlZDogZmFsc2UsXG4gXHRcdFx0X3NlbGZEZWNsaW5lZDogZmFsc2UsXG4gXHRcdFx0X2Rpc3Bvc2VIYW5kbGVyczogW10sXG4gXHRcdFx0X21haW46IGhvdEN1cnJlbnRDaGlsZE1vZHVsZSAhPT0gbW9kdWxlSWQsXG5cbiBcdFx0XHQvLyBNb2R1bGUgQVBJXG4gXHRcdFx0YWN0aXZlOiB0cnVlLFxuIFx0XHRcdGFjY2VwdDogZnVuY3Rpb24oZGVwLCBjYWxsYmFjaykge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZBY2NlcHRlZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcImZ1bmN0aW9uXCIpIGhvdC5fc2VsZkFjY2VwdGVkID0gZGVwO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBbaV1dID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBdID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRlY2xpbmU6IGZ1bmN0aW9uKGRlcCkge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZEZWNsaW5lZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcF0gPSB0cnVlO1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGlzcG9zZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZURpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdC5fZGlzcG9zZUhhbmRsZXJzLmluZGV4T2YoY2FsbGJhY2spO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly8gTWFuYWdlbWVudCBBUElcbiBcdFx0XHRjaGVjazogaG90Q2hlY2ssXG4gXHRcdFx0YXBwbHk6IGhvdEFwcGx5LFxuIFx0XHRcdHN0YXR1czogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aWYgKCFsKSByZXR1cm4gaG90U3RhdHVzO1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZFN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90U3RhdHVzSGFuZGxlcnMuaW5kZXhPZihsKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90U3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vaW5oZXJpdCBmcm9tIHByZXZpb3VzIGRpc3Bvc2UgY2FsbFxuIFx0XHRcdGRhdGE6IGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxuIFx0XHR9O1xuIFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSB1bmRlZmluZWQ7XG4gXHRcdHJldHVybiBob3Q7XG4gXHR9XG5cbiBcdHZhciBob3RTdGF0dXNIYW5kbGVycyA9IFtdO1xuIFx0dmFyIGhvdFN0YXR1cyA9IFwiaWRsZVwiO1xuXG4gXHRmdW5jdGlvbiBob3RTZXRTdGF0dXMobmV3U3RhdHVzKSB7XG4gXHRcdGhvdFN0YXR1cyA9IG5ld1N0YXR1cztcbiBcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBob3RTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcbiBcdFx0XHRob3RTdGF0dXNIYW5kbGVyc1tpXS5jYWxsKG51bGwsIG5ld1N0YXR1cyk7XG4gXHR9XG5cbiBcdC8vIHdoaWxlIGRvd25sb2FkaW5nXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzID0gMDtcbiBcdHZhciBob3RDaHVua3NMb2FkaW5nID0gMDtcbiBcdHZhciBob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdEF2YWlsYWJsZUZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90RGVmZXJyZWQ7XG5cbiBcdC8vIFRoZSB1cGRhdGUgaW5mb1xuIFx0dmFyIGhvdFVwZGF0ZSwgaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0ZnVuY3Rpb24gdG9Nb2R1bGVJZChpZCkge1xuIFx0XHR2YXIgaXNOdW1iZXIgPSAraWQgKyBcIlwiID09PSBpZDtcbiBcdFx0cmV0dXJuIGlzTnVtYmVyID8gK2lkIDogaWQ7XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdENoZWNrKGFwcGx5KSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwiaWRsZVwiKSB7XG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiY2hlY2soKSBpcyBvbmx5IGFsbG93ZWQgaW4gaWRsZSBzdGF0dXNcIik7XG4gXHRcdH1cbiBcdFx0aG90QXBwbHlPblVwZGF0ZSA9IGFwcGx5O1xuIFx0XHRob3RTZXRTdGF0dXMoXCJjaGVja1wiKTtcbiBcdFx0cmV0dXJuIGhvdERvd25sb2FkTWFuaWZlc3QoaG90UmVxdWVzdFRpbWVvdXQpLnRoZW4oZnVuY3Rpb24odXBkYXRlKSB7XG4gXHRcdFx0aWYgKCF1cGRhdGUpIHtcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdFx0XHRyZXR1cm4gbnVsbDtcbiBcdFx0XHR9XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RBdmFpbGFibGVGaWxlc01hcCA9IHVwZGF0ZS5jO1xuIFx0XHRcdGhvdFVwZGF0ZU5ld0hhc2ggPSB1cGRhdGUuaDtcblxuIFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdGhvdERlZmVycmVkID0ge1xuIFx0XHRcdFx0XHRyZXNvbHZlOiByZXNvbHZlLFxuIFx0XHRcdFx0XHRyZWplY3Q6IHJlamVjdFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHRob3RVcGRhdGUgPSB7fTtcbiBcdFx0XHR2YXIgY2h1bmtJZCA9IFwiYWxpLW9zcy9pbmRleFwiO1xuIFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1sb25lLWJsb2Nrc1xuIFx0XHRcdHtcbiBcdFx0XHRcdC8qZ2xvYmFscyBjaHVua0lkICovXG4gXHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aG90U3RhdHVzID09PSBcInByZXBhcmVcIiAmJlxuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJlxuIFx0XHRcdFx0aG90V2FpdGluZ0ZpbGVzID09PSAwXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBwcm9taXNlO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdIHx8ICFob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSlcbiBcdFx0XHRyZXR1cm47XG4gXHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gZmFsc2U7XG4gXHRcdGZvciAodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRob3RVcGRhdGVbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZiAoLS1ob3RXYWl0aW5nRmlsZXMgPT09IDAgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCkge1xuIFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXMrKztcbiBcdFx0XHRob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdFVwZGF0ZURvd25sb2FkZWQoKSB7XG4gXHRcdGhvdFNldFN0YXR1cyhcInJlYWR5XCIpO1xuIFx0XHR2YXIgZGVmZXJyZWQgPSBob3REZWZlcnJlZDtcbiBcdFx0aG90RGVmZXJyZWQgPSBudWxsO1xuIFx0XHRpZiAoIWRlZmVycmVkKSByZXR1cm47XG4gXHRcdGlmIChob3RBcHBseU9uVXBkYXRlKSB7XG4gXHRcdFx0Ly8gV3JhcCBkZWZlcnJlZCBvYmplY3QgaW4gUHJvbWlzZSB0byBtYXJrIGl0IGFzIGEgd2VsbC1oYW5kbGVkIFByb21pc2UgdG9cbiBcdFx0XHQvLyBhdm9pZCB0cmlnZ2VyaW5nIHVuY2F1Z2h0IGV4Y2VwdGlvbiB3YXJuaW5nIGluIENocm9tZS5cbiBcdFx0XHQvLyBTZWUgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDY1NjY2XG4gXHRcdFx0UHJvbWlzZS5yZXNvbHZlKClcbiBcdFx0XHRcdC50aGVuKGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gaG90QXBwbHkoaG90QXBwbHlPblVwZGF0ZSk7XG4gXHRcdFx0XHR9KVxuIFx0XHRcdFx0LnRoZW4oXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKHJlc3VsdCkge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcbiBcdFx0XHRcdFx0fSxcbiBcdFx0XHRcdFx0ZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0KGVycik7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdCk7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaCh0b01vZHVsZUlkKGlkKSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHRcdGRlZmVycmVkLnJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RBcHBseShvcHRpb25zKSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwicmVhZHlcIilcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJhcHBseSgpIGlzIG9ubHkgYWxsb3dlZCBpbiByZWFkeSBzdGF0dXNcIik7XG4gXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gXHRcdHZhciBjYjtcbiBcdFx0dmFyIGk7XG4gXHRcdHZhciBqO1xuIFx0XHR2YXIgbW9kdWxlO1xuIFx0XHR2YXIgbW9kdWxlSWQ7XG5cbiBcdFx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRTdHVmZih1cGRhdGVNb2R1bGVJZCkge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbdXBkYXRlTW9kdWxlSWRdO1xuIFx0XHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuXG4gXHRcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCkubWFwKGZ1bmN0aW9uKGlkKSB7XG4gXHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRjaGFpbjogW2lkXSxcbiBcdFx0XHRcdFx0aWQ6IGlkXG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0XHR2YXIgcXVldWVJdGVtID0gcXVldWUucG9wKCk7XG4gXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZUl0ZW0uaWQ7XG4gXHRcdFx0XHR2YXIgY2hhaW4gPSBxdWV1ZUl0ZW0uY2hhaW47XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmICghbW9kdWxlIHx8IG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZCkgY29udGludWU7XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fc2VsZkRlY2xpbmVkKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX21haW4pIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInVuYWNjZXB0ZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1vZHVsZS5wYXJlbnRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciBwYXJlbnRJZCA9IG1vZHVsZS5wYXJlbnRzW2ldO1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50ID0gaW5zdGFsbGVkTW9kdWxlc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdGlmICghcGFyZW50KSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcImRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0cGFyZW50SWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcbiBcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSwgW21vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdFx0Y29udGludWU7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xuIFx0XHRcdFx0XHRxdWV1ZS5wdXNoKHtcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdGlkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG5cbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0dHlwZTogXCJhY2NlcHRlZFwiLFxuIFx0XHRcdFx0bW9kdWxlSWQ6IHVwZGF0ZU1vZHVsZUlkLFxuIFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzOiBvdXRkYXRlZE1vZHVsZXMsXG4gXHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llczogb3V0ZGF0ZWREZXBlbmRlbmNpZXNcbiBcdFx0XHR9O1xuIFx0XHR9XG5cbiBcdFx0ZnVuY3Rpb24gYWRkQWxsVG9TZXQoYSwgYikge1xuIFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xuIFx0XHRcdFx0aWYgKGEuaW5kZXhPZihpdGVtKSA9PT0gLTEpIGEucHVzaChpdGVtKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBhdCBiZWdpbiBhbGwgdXBkYXRlcyBtb2R1bGVzIGFyZSBvdXRkYXRlZFxuIFx0XHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXG4gXHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuIFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdHZhciBhcHBsaWVkVXBkYXRlID0ge307XG5cbiBcdFx0dmFyIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSA9IGZ1bmN0aW9uIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSgpIHtcbiBcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIHJlc3VsdC5tb2R1bGVJZCArIFwiKSB0byBkaXNwb3NlZCBtb2R1bGVcIlxuIFx0XHRcdCk7XG4gXHRcdH07XG5cbiBcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0bW9kdWxlSWQgPSB0b01vZHVsZUlkKGlkKTtcbiBcdFx0XHRcdC8qKiBAdHlwZSB7VE9ET30gKi9cbiBcdFx0XHRcdHZhciByZXN1bHQ7XG4gXHRcdFx0XHRpZiAoaG90VXBkYXRlW2lkXSkge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZUlkKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcImRpc3Bvc2VkXCIsXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IGlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHQvKiogQHR5cGUge0Vycm9yfGZhbHNlfSAqL1xuIFx0XHRcdFx0dmFyIGFib3J0RXJyb3IgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0FwcGx5ID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9EaXNwb3NlID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgY2hhaW5JbmZvID0gXCJcIjtcbiBcdFx0XHRcdGlmIChyZXN1bHQuY2hhaW4pIHtcbiBcdFx0XHRcdFx0Y2hhaW5JbmZvID0gXCJcXG5VcGRhdGUgcHJvcGFnYXRpb246IFwiICsgcmVzdWx0LmNoYWluLmpvaW4oXCIgLT4gXCIpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c3dpdGNoIChyZXN1bHQudHlwZSkge1xuIFx0XHRcdFx0XHRjYXNlIFwic2VsZi1kZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIHNlbGYgZGVjbGluZTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBkZWNsaW5lZCBkZXBlbmRlbmN5OiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRcIiBpbiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnBhcmVudElkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJ1bmFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25VbmFjY2VwdGVkKSBvcHRpb25zLm9uVW5hY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVVbmFjY2VwdGVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2UgXCIgKyBtb2R1bGVJZCArIFwiIGlzIG5vdCBhY2NlcHRlZFwiICsgY2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkFjY2VwdGVkKSBvcHRpb25zLm9uQWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0FwcGx5ID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EaXNwb3NlZCkgb3B0aW9ucy5vbkRpc3Bvc2VkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9EaXNwb3NlID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0ZGVmYXVsdDpcbiBcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmV4Y2VwdGlvbiB0eXBlIFwiICsgcmVzdWx0LnR5cGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGFib3J0RXJyb3IpIHtcbiBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiYWJvcnRcIik7XG4gXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChhYm9ydEVycm9yKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0FwcGx5KSB7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gaG90VXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHQub3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0XHRcdFx0Zm9yIChtb2R1bGVJZCBpbiByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRcdFx0XHRpZiAoXG4gXHRcdFx0XHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcyxcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdFx0XHRcdClcbiBcdFx0XHRcdFx0XHQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KFxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0sXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF1cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9EaXNwb3NlKSB7XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgW3Jlc3VsdC5tb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IHdhcm5VbmV4cGVjdGVkUmVxdWlyZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBTdG9yZSBzZWxmIGFjY2VwdGVkIG91dGRhdGVkIG1vZHVsZXMgdG8gcmVxdWlyZSB0aGVtIGxhdGVyIGJ5IHRoZSBtb2R1bGUgc3lzdGVtXG4gXHRcdHZhciBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdG1vZHVsZUlkID0gb3V0ZGF0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdICYmXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdClcbiBcdFx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcbiBcdFx0XHRcdFx0bW9kdWxlOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0ZXJyb3JIYW5kbGVyOiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdFx0fSk7XG4gXHRcdH1cblxuIFx0XHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcbiBcdFx0T2JqZWN0LmtleXMoaG90QXZhaWxhYmxlRmlsZXNNYXApLmZvckVhY2goZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSA9PT0gZmFsc2UpIHtcbiBcdFx0XHRcdGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdH0pO1xuXG4gXHRcdHZhciBpZHg7XG4gXHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xuIFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdG1vZHVsZUlkID0gcXVldWUucG9wKCk7XG4gXHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0aWYgKCFtb2R1bGUpIGNvbnRpbnVlO1xuXG4gXHRcdFx0dmFyIGRhdGEgPSB7fTtcblxuIFx0XHRcdC8vIENhbGwgZGlzcG9zZSBoYW5kbGVyc1xuIFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IGRpc3Bvc2VIYW5kbGVycy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0Y2IgPSBkaXNwb3NlSGFuZGxlcnNbal07XG4gXHRcdFx0XHRjYihkYXRhKTtcbiBcdFx0XHR9XG4gXHRcdFx0aG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdID0gZGF0YTtcblxuIFx0XHRcdC8vIGRpc2FibGUgbW9kdWxlICh0aGlzIGRpc2FibGVzIHJlcXVpcmVzIGZyb20gdGhpcyBtb2R1bGUpXG4gXHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcblxuIFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxuIFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHdoZW4gZGlzcG9zaW5nIHRoZXJlIGlzIG5vIG5lZWQgdG8gY2FsbCBkaXNwb3NlIGhhbmRsZXJcbiBcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIFwicGFyZW50c1wiIHJlZmVyZW5jZXMgZnJvbSBhbGwgY2hpbGRyZW5cbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgY2hpbGQgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZS5jaGlsZHJlbltqXV07XG4gXHRcdFx0XHRpZiAoIWNoaWxkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlkeCA9IGNoaWxkLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIHtcbiBcdFx0XHRcdFx0Y2hpbGQucGFyZW50cy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxuIFx0XHR2YXIgZGVwZW5kZW5jeTtcbiBcdFx0dmFyIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xuIFx0XHRcdFx0XHRcdGlkeCA9IG1vZHVsZS5jaGlsZHJlbi5pbmRleE9mKGRlcGVuZGVuY3kpO1xuIFx0XHRcdFx0XHRcdGlmIChpZHggPj0gMCkgbW9kdWxlLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm90IGluIFwiYXBwbHlcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJhcHBseVwiKTtcblxuIFx0XHRob3RDdXJyZW50SGFzaCA9IGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXG4gXHRcdGZvciAobW9kdWxlSWQgaW4gYXBwbGllZFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXBwbGllZFVwZGF0ZSwgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXG4gXHRcdHZhciBlcnJvciA9IG51bGw7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXTtcbiBcdFx0XHRcdFx0XHRjYiA9IG1vZHVsZS5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcGVuZGVuY3ldO1xuIFx0XHRcdFx0XHRcdGlmIChjYikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKGNhbGxiYWNrcy5pbmRleE9mKGNiKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goY2IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0Y2IgPSBjYWxsYmFja3NbaV07XG4gXHRcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRcdGNiKG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzKTtcbiBcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGl0ZW0gPSBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXNbaV07XG4gXHRcdFx0bW9kdWxlSWQgPSBpdGVtLm1vZHVsZTtcbiBcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0aWYgKHR5cGVvZiBpdGVtLmVycm9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0aXRlbS5lcnJvckhhbmRsZXIoZXJyKTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZXJyMikge1xuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yLWhhbmRsZXItZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIyLFxuIFx0XHRcdFx0XHRcdFx0XHRvcmlnaW5hbEVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnIyO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXG4gXHRcdGlmIChlcnJvcikge1xuIFx0XHRcdGhvdFNldFN0YXR1cyhcImZhaWxcIik7XG4gXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiBcdFx0fVxuXG4gXHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gXHRcdFx0cmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aG90OiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpLFxuIFx0XHRcdHBhcmVudHM6IChob3RDdXJyZW50UGFyZW50c1RlbXAgPSBob3RDdXJyZW50UGFyZW50cywgaG90Q3VycmVudFBhcmVudHMgPSBbXSwgaG90Q3VycmVudFBhcmVudHNUZW1wKSxcbiBcdFx0XHRjaGlsZHJlbjogW11cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkpO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2RlbW9zL2Zyb250L1wiO1xuXG4gXHQvLyBfX3dlYnBhY2tfaGFzaF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIGhvdEN1cnJlbnRIYXNoOyB9O1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIGhvdENyZWF0ZVJlcXVpcmUoXCIuL3NyYy9hbGktb3NzL2luZGV4LmpzXCIpKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvYWxpLW9zcy9pbmRleC5qc1wiKTtcbiIsIi8qIOS9v+eUqOaWueazlVxu5Yib5bu65LiA5Liq5o6n5Yi25a+56LGhXG52YXIgZmFjdG9yeSA9IG5ldyAkLk9TU1VwbG9hZEZhY3Rvcnkoe1xuICBzdWJTeXN0ZW06IDIsXG4gIHVubW91bnRIb29rOiBmdW5jdGlvbiAoKSB7XG4gICAgJCgncHJldmlldycpLnJlbW92ZSgpXG4gIH1cbn0pXG7nm5HlkKzmlofku7ZcbiQoJ2lucHV0Jykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGUpIHtcbiAgZmFjdG9yeS5tb3VudChlLnRhcmdldC5maWxlc1swXSwgJCgncHJldmlldycpKVxufSlcbuebkeWQrOWIoOmZpFxuJCgnZGVsZXRlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICB2YXIga2V5ID0gJCgncHJldmlldycpLmRhdGEoJ29zcycpXG4gIGZhY3RvcnkudW5tb3VudChrZXkpXG59KVxu55uR5ZCs5LiK5LygXG4kKCd1cGxvYWQnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gIHZhciBrZXkgPSAkKCdwcmV2aWV3JykuZGF0YSgnb3NzJylcbiAgdmFyIHVwbG9hZGVyID0gZmFjdG9yeS5nZXRVcGxvYWRlckJ5S2V5KGtleSlcbiAgdXBsb2FkZXIudXBsb2FkKClcbn0pXG4qL1xuLyoqXG4gKiBhbGkgb3NzIGFkYXB0ZXJcbiAqIDIwMTggMy41XG4gKiBhdXRob3Igenp5XG4gKi9cbihmdW5jdGlvbigpIHtcbiAgLyoqXG4gICAqIOS4iuS8oOaWh+S7tuaehOmAoOWZqFxuICAgKiBAcGFyYW0gZmlsZVBsdXMgZmlsZeaJqeWxleWvueixoVxuICAgKiBAY29uc3RydWN0b3JcbiAgICovXG4gIGZ1bmN0aW9uIE9TU1VwbG9hZGVyKGZpbGVQbHVzKSB7XG4gICAgLy8g57yT5a2Yb3NzIGNsaWVudFxuICAgIHRoaXMudXBsb2FkRmlsZUNsaWVudCA9IG51bGw7XG4gICAgLy8g5pat54K557ut5Lyg6K6w5b2V54K5XG4gICAgdGhpcy5icmVha3BvaW50ID0gbnVsbDtcbiAgICAvLyDph43or5XorqHmlbBcbiAgICB0aGlzLnJldHJ5Q291bnQgPSAwO1xuICAgIC8vIOacgOWkp+mHjeivleasoeaVsFxuICAgIHRoaXMucmV0cnlDb3VudE1heCA9IDM7XG4gICAgdGhpcy5pc0NhbmNlbCA9IGZhbHNlO1xuICAgIHRoaXMuZmlsZVBsdXMgPSBmaWxlUGx1cztcbiAgICB0aGlzLmFwcGx5U3RzKCk7XG4gIH1cblxuICBPU1NVcGxvYWRlci5TVFNfVVJMID0gJy9jb21tb24vZmlsZVN0cy5odG0nO1xuXG4gIC8qKlxuICAgKiDor7fmsYJzdHPojrflj5Z0b2tlblxuICAgKi9cbiAgT1NTVXBsb2FkZXIucHJvdG90eXBlLmFwcGx5U3RzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICB2YXIgZmlsZVBsdXMgPSBfdGhpcy5maWxlUGx1cztcbiAgICB2YXIgZGVmID0gJC5EZWZlcnJlZCgpO1xuICAgIHZhciBzdHNVcmwgPSBPU1NVcGxvYWRGYWN0b3J5LlNUU19VUkw7XG4gICAgaWYgKCFfdGhpcy51cGxvYWRGaWxlQ2xpZW50KSB7XG4gICAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IHN0c1VybCxcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvck1zZykge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IocmVzLmRhdGEuZXJyb3JNc2cpO1xuICAgICAgICAgIGRlZi5yZWplY3QocmVzLmRhdGEuZXJyb3JNc2cpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBwb2xpY3lJbmYgPSByZXMuZGF0YS5wb2xpY3lJbmY7XG4gICAgICAgICAgdmFyIGZpbGVMaXN0ID0gcmVzLmRhdGEuZmlsZUxpc3Q7XG4gICAgICAgICAgZ2VuRmlsZVBsdXMoZmlsZVBsdXMsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHJldCA9IHtcbiAgICAgICAgICAgICAgcG9saWN5SW5mOiBwb2xpY3lJbmYsXG4gICAgICAgICAgICAgIGZpbGVMaXN0OiBmaWxlTGlzdCxcbiAgICAgICAgICAgICAgZmlsZVV1aWQ6IGZpbGVMaXN0WzBdLmZpbGVVdWlkLFxuICAgICAgICAgICAgICBmaWxlS2V5OiBmaWxlTGlzdFswXS5maWxlS2V5LFxuICAgICAgICAgICAgICB1dWlkOiAnJyArIGZpbGVQbHVzLmZpbGVVdWlkICsgZmlsZVBsdXMuZmlsZUljb24udG9Mb3dlckNhc2UoKSxcbiAgICAgICAgICAgICAgZmlsZUJvZHk6IHtcbiAgICAgICAgICAgICAgICBmaWxlS2V5OiBmaWxlUGx1cy51dWlkLFxuICAgICAgICAgICAgICAgIGZpbGVTaXplOiBmaWxlUGx1cy5maWxlU2l6ZSxcbiAgICAgICAgICAgICAgICBmaWxlTWQ1OiBmaWxlUGx1cy5NRDUsXG4gICAgICAgICAgICAgICAgZmlsZUlkOiBmaWxlTGlzdFswXS5maWxlVXVpZCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAoZmlsZUxpc3RbMF0uZmlsZUtleSkge1xuICAgICAgICAgICAgICByZXQuaXNVcGxvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIF90aGlzLnVwbG9hZEZpbGVDbGllbnQgPSBuZXcgT1NTKHtcbiAgICAgICAgICAgIHJlZ2lvbjogJ29zcy1jbi1oYW5nemhvdScsXG4gICAgICAgICAgICBhY2Nlc3NLZXlJZDogcG9saWN5SW5mLmFjY2Vzc0tleUlkLFxuICAgICAgICAgICAgYWNjZXNzS2V5U2VjcmV0OiBwb2xpY3lJbmYuYWNjZXNzS2V5U2VjcmV0LFxuICAgICAgICAgICAgc3RzVG9rZW46IHBvbGljeUluZi5zZWN1cml0eVRva2VuLFxuICAgICAgICAgICAgYnVja2V0OiBwb2xpY3lJbmYuYnVja2V0LFxuICAgICAgICAgICAgdGltZW91dDogMTgwMDAwMDAwLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGRlZi5yZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gZGVmO1xuICB9O1xuXG4gIC8qKlxuICAgKiDkuIrkvKDmlofku7bmiafooYzlh73mlbBcbiAgICovXG4gIE9TU1VwbG9hZGVyLnByb3RvdHlwZS51cGxvYWRGaWxlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICB2YXIgZmlsZVBsdXMgPSBfdGhpcy5maWxlUGx1cztcbiAgICB2YXIga2V5ID0gZmlsZVBsdXMudXVpZDtcblxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICBwcm9ncmVzczogZnVuY3Rpb24ocCwgY2hlY2twb2ludCkge1xuICAgICAgICBfdGhpcy5icmVha3BvaW50ID0gY2hlY2twb2ludDtcbiAgICAgICAgLy8gVE9ET1xuICAgICAgfSxcbiAgICAgIHBhcnRTaXplOiA1MCAqIDEwMCAqIDEwMjQsXG4gICAgICB0aW1lb3V0OiA2MDAwMCxcbiAgICAgIHBhcmFsbGVsOiAyMCxcbiAgICAgIGNhbGxiYWNrOiB7XG4gICAgICAgIHVybDogZmlsZVBsdXMuZmlsZUNvbmZpZy5jYWxsQmFja1VybCxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZmlsZVBsdXMuZmlsZUJvZHkpLFxuICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgfSxcbiAgICB9O1xuICAgIGlmIChfdGhpcy5icmVha3BvaW50KSB7XG4gICAgICBvcHRpb25zLmNoZWNrcG9pbnQgPSBfdGhpcy5icmVha3BvaW50O1xuICAgIH1cbiAgICByZXR1cm4gX3RoaXMudXBsb2FkRmlsZUNsaWVudFxuICAgICAgLm11bHRpcGFydFVwbG9hZChrZXksIGZpbGVQbHVzLnNvdXJjZUZpbGUsIG9wdGlvbnMpXG4gICAgICAudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3VwbG9hZCBzdWNjZXNzOiAlaicsIHJlcyk7XG4gICAgICAgIF90aGlzLmJyZWFrcG9pbnQgPSBudWxsO1xuICAgICAgICBfdGhpcy51cGxvYWRGaWxlQ2xpZW50ID0gbnVsbDtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgIGlmIChfdGhpcy51cGxvYWRGaWxlQ2xpZW50ICYmIF90aGlzLnVwbG9hZEZpbGVDbGllbnQuaXNDYW5jZWwoKSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdzdG9wLXVwbG9hZCEnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoZXJyLm5hbWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKCdjb25uZWN0aW9udGltZW91dCcpICE9PSAtMSkge1xuICAgICAgICAgICAgLy8gdGltZW91dCByZXRyeVxuICAgICAgICAgICAgaWYgKF90aGlzLnJldHJ5Q291bnQgPCBfdGhpcy5yZXRyeUNvdW50TWF4KSB7XG4gICAgICAgICAgICAgIF90aGlzLnJldHJ5Q291bnQrKztcbiAgICAgICAgICAgICAgX3RoaXMudXBsb2FkRmlsZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIOS4iuS8oOaWh+S7tueuoeeQhuaehOmAoOWZqFxuICAgKiBAcGFyYW0gY29uZmlnLnVubW91bnRIb29rIOWNuOi9veWbnuiwg+WHveaVsFxuICAgKiBAcGFyYW0gY29uZmlnLnN1YlN5c3RlbVxuICAgKiBAY29uc3RydWN0b3JcbiAgICovXG4gIGZ1bmN0aW9uIE9TU1VwbG9hZEZhY3RvcnkoY29uZmlnKSB7XG4gICAgdGhpcy51cGxvYWRlcnMgPSB7fTtcbiAgICB0aGlzLmZpbGVDb25maWcgPSBudWxsO1xuICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICAgIHRoaXMuYXBwbHlGaWxlQ29uZmlnKCk7XG4gIH1cblxuICBPU1NVcGxvYWRGYWN0b3J5LkZJTEVfQ09ORklHX1VSTCA9ICcvY29tbW9uL3VwbG9hZEZpbGVDb25maWcuaHRtJztcblxuICAvKipcbiAgICog5oyC6L295LiA5Liq5LiK5Lyg5a6e5L6LXG4gICAqIEBwYXJhbSBmaWxlIOaWh+S7tuacrOS9k1xuICAgKiBAcGFyYW0gdGFyZ2V0RWxtIGRvbeebruagh+WvueixoVxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgT1NTVXBsb2FkRmFjdG9yeS5wcm90b3R5cGUubW91bnQgPSBmdW5jdGlvbihmaWxlLCB0YXJnZXRFbG0pIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHZhciBmaWxlUGx1cyA9IGdlbkZpbGVQbHVzKFxuICAgICAgZmlsZSxcbiAgICAgIHtcbiAgICAgICAgdGFyZ2V0RWxtOiB0YXJnZXRFbG0sXG4gICAgICAgIGZpbGVDb25maWc6IF90aGlzLmZpbGVDb25maWcsXG4gICAgICB9LFxuICAgICAgdHJ1ZSxcbiAgICApO1xuICAgIHZhciBrZXkgPSBnZW5VVUlEKCk7XG4gICAgY29tcHV0ZU1ENShmaWxlUGx1cykudGhlbihmdW5jdGlvbigpIHtcbiAgICAgIF90aGlzLnVwbG9hZGVyc1trZXldID0gbmV3IE9TU1VwbG9hZGVyKGZpbGVQbHVzKTtcbiAgICB9KTtcbiAgICB0YXJnZXRFbG0uZGF0YSgnb3NzJywga2V5KTtcbiAgICByZXR1cm4ga2V5O1xuICB9O1xuXG4gIC8qKlxuICAgKiDljbjovb3kuIDkuKrkuIrkvKDlrp7kvotcbiAgICogQHBhcmFtIGtleVxuICAgKi9cbiAgT1NTVXBsb2FkRmFjdG9yeS5wcm90b3R5cGUudW5tb3VudCA9IGZ1bmN0aW9uKGtleSkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgX3RoaXMuY29uZmlnLnVubW91bnRIb29rKCk7XG4gICAgZGVsZXRlIF90aGlzLnVwbG9hZGVyc1trZXldO1xuICB9O1xuXG4gIC8qKlxuICAgKiDojrflj5bmjIflrpp1cGxvYWRlclxuICAgKiBAcGFyYW0ga2V5XG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgT1NTVXBsb2FkRmFjdG9yeS5wcm90b3R5cGUuZ2V0VXBsb2FkZXJCeUtleSA9IGZ1bmN0aW9uKGtleSkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgcmV0dXJuIF90aGlzLnVwbG9hZGVyc1trZXldO1xuICB9O1xuICAvKipcbiAgICog6I635Y+W5paH5Lu26YWN572uXG4gICAqL1xuICBPU1NVcGxvYWRGYWN0b3J5LnByb3RvdHlwZS5hcHBseUZpbGVDb25maWcgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHZhciBmaWxlQ29uZmlnVXJsID0gT1NTVXBsb2FkRmFjdG9yeS5GSUxFX0NPTkZJR19VUkw7XG4gICAgdmFyIHN1YlN5c3RlbSA9IF90aGlzLmNvbmZpZy5zdWJTeXN0ZW07XG4gICAgJC5hamF4KHtcbiAgICAgIHVybDogZmlsZUNvbmZpZ1VybCxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgc3ViU3lzdGVtOiBzdWJTeXN0ZW0sXG4gICAgICB9LFxuICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgICBpZiAocmVzLmRhdGEuZXJyb3JNc2cpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihyZXMuZGF0YS5lcnJvck1zZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfdGhpcy5maWxlQ29uZmlnID0gcmVzLmRhdGE7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIOaJqeWxlWZpbGXlr7nosaFcbiAgICogQHBhcmFtIGZpbGUg5paH5Lu25pys5L2TXG4gICAqIEBwYXJhbSBleHQg6Ieq5a6a5LmJ5omp5bGVXG4gICAqIEBwYXJhbSBmaXJzdCDmmK/lkKbnrKzkuIDmrKHmianlsZVcbiAgICovXG4gIGZ1bmN0aW9uIGdlbkZpbGVQbHVzKGZpbGUsIGV4dCwgZmlyc3QpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHZhciBmaWxlUGx1cyA9IGZpbGU7XG4gICAgaWYgKGZpcnN0KSB7XG4gICAgICB2YXIgaWNvbiA9IGdlbkZpbGVJY29uKGZpbGUubmFtZSk7XG4gICAgICB2YXIgdHlwZSA9IGZpbGUudHlwZSB8fCBpY29uO1xuICAgICAgaWYgKGljb24gPT09ICdwYmltJykge1xuICAgICAgICB0eXBlID0gJ3BiaW0nO1xuICAgICAgfVxuICAgICAgZmlsZVBsdXMgPSB7XG4gICAgICAgIGlkOiBNYXRoLnJhbmRvbSgpXG4gICAgICAgICAgLnRvU3RyaW5nKDM2KVxuICAgICAgICAgIC5zdWJzdHIoMiksXG4gICAgICAgIGNodW5rTGlzdDogW10sXG4gICAgICAgIHByb2dyZXNzOiAwLFxuICAgICAgICBmaWxlS2V5OiAnJyxcbiAgICAgICAgcHJvZ3Jlc3NNRDU6IDAsXG4gICAgICAgIHNwZWVkOiAwLFxuICAgICAgICBlcnJvcjogJycsXG4gICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICBpc1BhdXNlOiBmYWxzZSxcbiAgICAgICAgcmVzcG9uc2U6IHt9LFxuICAgICAgICBmaWxlTGlzdDogW10sXG4gICAgICAgIGRvbmVQYXJ0czogW10sXG4gICAgICAgIHBvbGljeUluZjoge30sXG4gICAgICAgIGJsb2I6IGdlbkZpbGVCb2xkKGZpbGUpLFxuICAgICAgICBmaWxlTmFtZTogZmlsZS5uYW1lLFxuICAgICAgICBmaWxlU2l6ZTogZmlsZS5zaXplLFxuICAgICAgICBmaWxlVHlwZTogZ2VuRmlsZVR5cGUoZmlsZSksXG4gICAgICAgIGZpbGVJY29uOiBpY29uLFxuICAgICAgICBmaWxlTWluZTogdHlwZSxcbiAgICAgICAgcGxheVRpbWU6IGZpbGUucGxheVRpbWUgfHwgJycsXG4gICAgICAgIHBpY1JhZGlvOiBmaWxlLnBpY1JhZGlvIHx8ICcnLFxuICAgICAgICB1dWlkOiAnJyxcbiAgICAgICAgc291cmNlRmlsZTogZmlsZSxcbiAgICAgICAgZmlsZUNvbmZpZzogX3RoaXMuZmlsZUNvbmZpZyxcbiAgICAgIH07XG4gICAgfVxuICAgIGlmIChleHQpIHtcbiAgICAgIGV4dCA9IHR5cGVvZiBleHQgPT09ICdmdW5jdGlvbicgPyBleHQoKSA6IGV4dDtcbiAgICAgICQuZXh0ZW5kKGZpbGVQbHVzLCBleHQpO1xuICAgIH1cbiAgICByZXR1cm4gZmlsZVBsdXM7XG4gIH1cblxuICAvKipcbiAgICog55Sf5oiQdXVpZFxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgZnVuY3Rpb24gZ2VuVVVJRCgpIHtcbiAgICByZXR1cm4gJ3h4eHh4eHh4eXl5eXl5eXknLnJlcGxhY2UoL1t4eV0vZywgZnVuY3Rpb24oYykge1xuICAgICAgdmFyIHIgPSAoTWF0aC5yYW5kb20oKSAqIDE2KSB8IDAsXG4gICAgICAgIHYgPSBjID09PSAneCcgPyByIDogKHIgJiAweDMpIHwgMHg4O1xuICAgICAgcmV0dXJuIHYudG9TdHJpbmcoMTYpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2VuRmlsZVR5cGUoZmlsZSkge1xuICAgIHZhciBuYW1lID0gZmlsZS5uYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKC9cXC4oZ2lmfGpwZ3xqcGVnfHBuZykkLy50ZXN0KG5hbWUpKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9XG4gICAgaWYgKC9cXC4od2F2fGZsYXZ8YXBlfGFsYWN8bXAzfEpQYWF2R3xvZ2d8b3B1cykkLy50ZXN0KG5hbWUpKSB7XG4gICAgICByZXR1cm4gMjtcbiAgICB9XG4gICAgaWYgKC9cXC4obXBlZ3xhdml8bW92fGFzZnx3bXZ8bnZhaXwzZ3B8cmF8cmFtfG1rdnxmbHZ8ZjR2fHJtdmJ8d2VibXxtcDQpJC8udGVzdChuYW1lKSkge1xuICAgICAgcmV0dXJuIDM7XG4gICAgfVxuICAgIHJldHVybiA0O1xuICB9XG5cbiAgZnVuY3Rpb24gZ2VuRmlsZUJvbGQoZmlsZSkge1xuICAgIGlmIChmaWxlLnR5cGUuc3Vic3RyKDAsIDYpID09PSAnaW1hZ2UvJykge1xuICAgICAgdmFyIFVSTCA9IHdpbmRvdy5VUkwgfHwgd2luZG93LndlYmtpdFVSTDtcbiAgICAgIGlmIChVUkwgJiYgVVJMLmNyZWF0ZU9iamVjdFVSTCkge1xuICAgICAgICByZXR1cm4gVVJMLmNyZWF0ZU9iamVjdFVSTChmaWxlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZW5GaWxlSWNvbihuYW1lKSB7XG4gICAgcmV0dXJuIG5hbWUuc2xpY2UobmFtZS5sYXN0SW5kZXhPZignLicpICsgMSkudG9Mb3dlckNhc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDorqHnrpfmlofku7bnmoRNRDVcbiAgICogQHBhcmFtIGZpbGVQbHVzXG4gICAqL1xuICBmdW5jdGlvbiBjb21wdXRlTUQ1KGZpbGVQbHVzKSB7XG4gICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKTtcbiAgICB2YXIgZmlsZVJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgdmFyIGJsb2JTbGljZSA9IEZpbGUucHJvdG90eXBlLm1velNsaWNlIHx8IEZpbGUucHJvdG90eXBlLndlYmtpdFNsaWNlIHx8IEZpbGUucHJvdG90eXBlLnNsaWNlO1xuICAgIHZhciBzcGFya0NodW5rU2l6ZSA9IDUyNDI4ODA7XG4gICAgdmFyIHNwYXJrQ2h1bmtzID0gTWF0aC5jZWlsKGZpbGVQbHVzLnNvdXJjZUZpbGUuc2l6ZSAvIHNwYXJrQ2h1bmtTaXplKTtcbiAgICB2YXIgY3VycmVudENodW5rID0gMDtcbiAgICBmaWxlUmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgIHZhciBzcGFyayA9IG5ldyBTcGFya01ENS5BcnJheUJ1ZmZlcigpO1xuICAgICAgZ2VuRmlsZVBsdXMoZmlsZVBsdXMsIHtcbiAgICAgICAgcHJvZ3Jlc3NNRDU6ICgoY3VycmVudENodW5rICsgMSkgLyBzcGFya0NodW5rcykgKiAxMDAsXG4gICAgICB9KTtcbiAgICAgIHNwYXJrLmFwcGVuZChlLnRhcmdldC5yZXN1bHQpO1xuICAgICAgY3VycmVudENodW5rKys7XG4gICAgICBpZiAoY3VycmVudENodW5rIDwgc3BhcmtDaHVua3MpIHtcbiAgICAgICAgbG9hZE5leHQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGdlbkZpbGVQbHVzKGZpbGVQbHVzLCB7XG4gICAgICAgICAgTUQ1OiBzcGFyay5lbmQoKSxcbiAgICAgICAgfSk7XG4gICAgICAgIGRlZi5yZXNvbHZlKCk7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgbG9hZE5leHQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzdGFydCA9IGN1cnJlbnRDaHVuayAqIHNwYXJrQ2h1bmtTaXplO1xuICAgICAgdmFyIGVuZCA9XG4gICAgICAgIHN0YXJ0ICsgc3BhcmtDaHVua1NpemUgPj0gZmlsZVBsdXMuc291cmNlRmlsZS5zaXplXG4gICAgICAgICAgPyBmaWxlUGx1cy5zb3VyY2VGaWxlLnNpemVcbiAgICAgICAgICA6IHN0YXJ0ICsgc3BhcmtDaHVua1NpemU7XG4gICAgICBmaWxlUmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGJsb2JTbGljZS5jYWxsKGZpbGVQbHVzLnNvdXJjZUZpbGUsIHN0YXJ0LCBlbmQpKTtcbiAgICB9O1xuICAgIGxvYWROZXh0KCk7XG4gICAgcmV0dXJuIGRlZjtcbiAgfVxuXG4gICQuT1NTVXBsb2FkRmFjdG9yeSA9IE9TU1VwbG9hZEZhY3Rvcnk7XG59KSgpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==