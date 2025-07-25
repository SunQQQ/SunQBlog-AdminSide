'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api': {
        //代理地址，这里是真正访问的地址。使用本地接口服务时请用localhost，使用服务器数据库时请使用对应的ip
        target: 'http://localhost:8080', //代理地址，这里是真正访问的地址。使用本地接口服务时请用localhost，使用服务器数据库时请使用对应的ip
        // target: 'http://39.104.22.73:8888', //代理地址，这里是真正访问的地址。使用本地接口服务时请用localhost，使用服务器数据库时请使用对应的ip
        changeOrigin: true, //改变源
        pathRewrite: {
          '^/api': '' //路径重写
        }
      },
      '/snake':{
        target: 'http://39.104.22.73:8081', //代理地址，这里是真正访问的地址。使用本地接口服务时请用localhost，使用服务器数据库时请使用对应的ip
        changeOrigin: true, //改变源
        pathRewrite: {
          '^/snake': '' //路径重写
        }
      }
    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8081, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../admin/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../admin'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',

    /**
     * Map文件用来调试压缩后的代码，暂不需要调试先关闭，后期可打开
     */
    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: true,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
