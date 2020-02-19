const { resolve } = require('./utils');
const glob = require('glob');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const nodeEnv = process.env.NODE_ENV;
console.log(nodeEnv)
/**
 * 获取入口
 */
const getEntries = () => {
  const entries = Object.create(null);
  Object.assign(entries, { index: resolve('src/index.js') });
  glob.sync(resolve('src/**/index.js')).forEach(name => {
    const ns = name.split('/');
    const key = ns[ns.length - 2];
    Object.assign(entries, { [`${key}/index`]: name });
  });
  return entries;
};
/**
 * 获取html模版
 */
const getHtmlTemplate = () => {
  const temps = [
    {
      title: '首页',
      filename: 'index.html',
      template: resolve('src/index.html'),
      chunks: ['index'],
    },
  ];
  glob.sync(resolve('src/**/index.html')).forEach(name => {
    const ns = name.split('/');
    const key = ns[ns.length - 2];
    const params = {
      title: `demo之${key}`,
      filename: `${key}/index.html`,
      template: name,
      chunks: [`${key}/index`],
    };
    temps.push(params);
  });
  return temps;
};
/**
 * 生成html模版插件配置
 */
const genHtmlTemplateConfig = fn => {
  return new HtmlWebpackPlugin(fn());
};
const htmlTemplateConfig = getHtmlTemplate().map(temp => {
  return genHtmlTemplateConfig(() => ({
    title: temp.title,
    filename: temp.filename,
    template: temp.template,
    chunks: temp.chunks,
  }));
});

/**
 * 主配置
 */
const config = {
  mode: 'development',
  entry: getEntries(),
  output: {
    path: resolve('front'),
    filename: '[name].js',
    libraryTarget: 'umd',
    publicPath: nodeEnv === 'dev' ? '/' : '/demos/front/',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: false,
    publicPath: '/',
    index: 'index.html',
    hot: true,
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.(css|scss|sass)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [resolve('src/common/common.scss')],
            },
          },
        ],
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [require('@babel/plugin-proposal-class-properties')],
          },
        },
        exclude: '/node_modules/',
      },
    ],
  },
  plugins: [
    ...htmlTemplateConfig,
    new CleanWebpackPlugin(['front'], {
      root: resolve(),
    }),
    // 热部署
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([{ from: 'src/static', to: 'static' }]),
  ],
};
module.exports = config;
