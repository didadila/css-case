/**
 * 配置参考:
 * https://cli.vuejs.org/zh/config/
 */
// const url = 'http://localhost:9999'
const url = 'http://10.129.0.101:9990'
module.exports = {
  lintOnSave: true,
  productionSourceMap: false,
  publicPath:"./",
  chainWebpack: config => {
    // 忽略的打包文件
    config.externals({
      'axios': 'axios'
    })
    const entry = config.entry('app')
    entry
      .add('babel-polyfill')
      .end()
    entry
      .add('classlist-polyfill')
      .end()
  },
  // 配置转发代理
  devServer: {
    disableHostCheck: true,
    port: 8085,
    proxy: {
      '/': {
        target: url,
        ws: true, // 需要websocket 开启
        changeOrigin: true,
        pathRewrite: {
          '^/': '/'
        }
      }
      // 3.5 以后不需要再配置
    }
  }
}
