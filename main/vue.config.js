'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'Micro Front App' // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 9528 npm run dev OR npm run dev --port = 9528
const port = process.env.port || process.env.npm_config_port || 8080 // dev port

const assetsCDN = {
  // webpack build externals
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    axios: 'axios',
    // 'element-ui': 'element-ui', 这种形式会报错
    'elementui': 'element-ui',
    qiankun: 'qiankun',
  },
  // externals: ['vue', 'vue-router', 'element-ui', 'axios', 'vuex'],
  css: [
    'https://unpkg.com/element-ui/lib/theme-chalk/index.css"'
  ],
  // https://unpkg.com/browse/vue@2.6.10/
  js: [
    'https://unpkg.com/vue@2.6.10/dist/vue.min.js',
    'https://unpkg.com/vuex@2.5.0/dist/vuex.min.js',
    'https://unpkg.com/vue-router@2.8.1/dist/vue-router.min.js',
    'https://unpkg.com/axios@0.21.1/dist/axios.min.js',
    'https://unpkg.com/element-ui/lib/index.js',
    'https://unpkg.com/qiankun@2.4.3/dist/index.umd.min.js'
  ]
}

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    before: require('./mock/mock-server.js')
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    externals: assetsCDN.externals,
  },
  filenameHashing: false,
  chainWebpack(config) {
    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')
    config.devServer.set('inline', false)
    config.devServer.set('hot', true)
    // Vue CLI 4 output filename is js/[chunkName].js, different from Vue CLI 3
    // More Detail: https://github.com/vuejs/vue-cli/blob/master/packages/%40vue/cli-service/lib/config/app.js#L29
    if (process.env.NODE_ENV !== 'production') {
      config.output.filename(`js/[name].js`)
    }
    // config.externals(['vue', 'vue-router', 'element-ui', 'axios', 'vuex'])

    config.plugin('html').tap(args => {
      args[0].cdn = assetsCDN
      return args
    })

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

  }
}
