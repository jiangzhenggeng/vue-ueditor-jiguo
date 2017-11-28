var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

var entry = {}

var arguments = process.argv.length > 2 ? [process.argv[2]] : []
var completeModule = []
if (arguments.length) {
  config.page.forEach((item) => {
    if (completeModule.length) return
    arguments.forEach((name) => {
      if (completeModule.length) return
      if (item.name == name) {
        completeModule.push(item)
      }
    })
  })
} else {
  completeModule = config.page.filter((item) => {
    if (item[i].notpackage) {
      return false
    }
    return true
  })
}

if (!completeModule.length && process.argv[3] !== 'test/unit/karma.conf.js') {
  process.exit(0)
}

completeModule.forEach((item) => {
  entry[item.name] = item.main
  if (item.subModel && Object.prototype.toString.call(item.subModel) === '[object Object]') {
    for (var i in item.subModel){
      entry[i] = item.subModel[i]
    }
  }
})

if (completeModule.length == 1) {
  if (completeModule[0].assetsRoot !== undefined) {
    config.build.assetsRoot = completeModule[0].assetsRoot
  }
  if (completeModule[0].assetsSubDirectory !== undefined) {
    config.build.assetsSubDirectory = completeModule[0].assetsSubDirectory
  }
  if (completeModule[0].assetsPublicPath !== undefined) {
    config.build.assetsPublicPath = completeModule[0].assetsPublicPath
  }
}

module.exports = {
  entry: entry,
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.min.js', '.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/vue-jui')],
        exclude: {
          test: [/\.min\.(js|css)$/]
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 9999999999,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(html|php)$/,
        loader: 'html-loader'
      },
      {
        test: /\.(ejs)$/,
        loader: 'extract-loader!html-loader!ejs-loader',
      }
    ]
  }
}
