const { defineConfig } = require('@vue/cli-service')
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require('unplugin-vue-components/webpack')({ /* options */ }),
      require('unplugin-auto-import/webpack')({ /* options */ }),
    ],
  },
  transpileDependencies: true,
  devServer: {
    open: true,
    host: '127.0.0.1', // 指定使用地址，默认localhost,0.0.0.0代表可以被外界访问
    port: 8080
  }
}