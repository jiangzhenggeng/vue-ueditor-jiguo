var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var path = require('path')
var baseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

var arguments = process.argv.length > 2 ? [process.argv[2]] : []

var HtmlWebpackPluginObj = null
if (arguments.length) {
  config.page.forEach((item) => {
    arguments.forEach((name) => {
      if (item.name == name) {
        var chunks = [name]
        if (item.subModel && Object.prototype.toString.call(item.subModel) === '[object Object]') {
          for (var i in item.subModel) {
            chunks.push(i)
          }
        }
        HtmlWebpackPluginObj = new HtmlWebpackPlugin({
          filename: 'index.html',
          template: item.options.template,
          inject: true,
          chunks: chunks,
          removeAttributeQuotes: false
        })
      }
    })
  })
} else {
  var chunks = ['index']
  config.page.forEach((item) => {
    if (item.name == 'index') {
      if (item.subModel && Object.prototype.toString.call(item.subModel) === '[object Object]') {
        for (var i in item.subModel) {
          chunks.push(i)
        }
      }
    }
  })

  HtmlWebpackPluginObj = new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './src/pages/index/block_tpl/index.ejs.js',
    inject: true,
    chunks: chunks,
    removeAttributeQuotes: false
  })
}

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap})
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    HtmlWebpackPluginObj,
    new FriendlyErrorsPlugin()
  ]
})
