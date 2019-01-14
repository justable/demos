const WebpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const {resolve} = require('./utils')
const config = require('./webpack.config.js')

const options = {
  contentBase: resolve('dist'),
  publicPath: '/',
  index: 'index.html',
  hot: true,
  compress: true,
  open: true,
  host: 'localhost'
}

WebpackDevServer.addDevServerEntrypoints(config, options)
const compiler = webpack(config)
const server = new WebpackDevServer(compiler, options)

server.listen(5000, 'localhost', () => {
  console.log('dev server listening on port 5000')
})
