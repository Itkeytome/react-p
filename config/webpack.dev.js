const path = require('path')
const WebpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')

// 合并公共配置，添加开发环境配置
module.exports = WebpackMerge.merge(baseConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    port: 3004, // 服务端口号
    compress: false, // gzip压缩,开发环境不开启,提升热更新速度
    hot: true,  // 开启热更新，后面会讲react模块热替换具体配置
    historyApiFallback: true, // 解决history路由404问题
    static: {
      directory: path.join(__dirname, '../public') // 
    }
  }
})