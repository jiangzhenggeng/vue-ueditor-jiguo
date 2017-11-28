// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var v = 'v1.0.0'

module.exports = {
  page: require('./page.config'),
  build: {
    env: require('./prod.env'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: '',
    assetsPublicPath: 'static',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: '',
    assetsPublicPath: '/',
    proxyTable: {
      '/api/html': {
        target: 'http://new.jiguo.com',
        secure: true,
        changeOrigin: true
      },
      '/api': {
        target: 'http://new.jiguo.com',
        secure: true,
        changeOrigin: true
      },
      '/mb/ajax': {
        target: 'http://new.jiguo.com',
        secure: true,
        changeOrigin: true
      },
      '/mb/api': {
        target: 'http://new.jiguo.com',
        secure: true,
        changeOrigin: true
      },
      '/wxcode': {
        target: 'https://wx.jiguo.com',
        secure: true,
        changeOrigin: true
      },
      '/protected': {
        target: 'http://dev.jiguo.com',
        secure: true,
        changeOrigin: true
      },
      '/cdn': {
        target: 'http://cdn.jiguo.com',
        secure: true,
        pathRewrite: {
          '^/cdn': '/'
        },
        changeOrigin: true
      },
      '/UEditor/php': {
        target: 'http://dev.jiguo.com',
        secure: true,
        pathRewrite: {
          '^/UEditor/php': '/protected/extensions/editor/php'
        },
        changeOrigin: true
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
