const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

module.exports = {
  transpileDependencies: true,
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://192.168.1.94:80',
  //       changeOrigin: true,
  //       ws: true
  //     }
  //   }
  // }
}