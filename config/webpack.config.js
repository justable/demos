const {resolve} = require('./utils')
const glob = require('glob')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/**
 * 获取入口
 */
const getEntries = () => {
  const entries = Object.create(null)
  Object.assign(entries, {index: resolve('src/index.js')})
  glob.sync(resolve('src/**/index.js'))
    .forEach(name => {
      const ns = name.split('/')
      const key = ns[ns.length - 2]
      Object.assign(entries, {[`${key}/index`]: name})
    })
  return entries
}
/**
 * 获取html模版
 */
const getHtmlTemplate = () => {
  const temps = [{
    title: '首页',
    filename: 'index.html',
    template: resolve('src/index.html'),
    chunks: ['index']
  }]
  glob.sync(resolve('src/**/index.html'))
    .forEach(name => {
      const ns = name.split('/')
      const key = ns[ns.length - 2]
      const params = {
        title: `demo之${key}`,
        filename: `${key}/index.html`,
        template: name,
        chunks: [`${key}/index`]
      }
      temps.push(params)
    })
  return temps
}
/**
 * 生成html模版插件配置
 */
const genHtmlTemplateConfig = (fn) => {
  return new HtmlWebpackPlugin(fn())
}
const htmlTemplateConfig = getHtmlTemplate().map(temp => {
  return genHtmlTemplateConfig(() => ({
    title: temp.title,
    filename: temp.filename,
    template: temp.template,
    chunks: temp.chunks
  }))
})

/**
 * 主配置
 */
const config = {
  mode: 'development',
  entry: getEntries(),
  output: {
    path: resolve('dist'),
    filename: '[name].js',
    publicPath: '/',
    libraryTarget: 'umd'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: resolve('dist'),
    publicPath: '/',
    index: 'index.html',
    hot: true,
    compress: true,
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.(css|scss|sass)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: '/node_modules/'
      }
    ]
  },
  plugins: [
    ...htmlTemplateConfig,
    new CleanWebpackPlugin(['dist'], {
      root: resolve()
    }),
    // 热部署
    new webpack.HotModuleReplacementPlugin()
  ]
}
module.exports = config
