const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // 入口文件
  entry: path.join(__dirname, '../src/index.tsx'),
  // 打包文件出口
  output: {
    filename: 'static/js/[name].js', // 每个js输出的名称
    path: path.join(__dirname, '../dist'), // 打包结果输出路径
    clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
    publicPath: '/' // 打包后文件的公共前缀路径
  },
  // 配置loader
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            // 预设执行从右往左
            presets: [
              '@babel/preset-react',
              '@babel/preset-typescript'
            ]
          }
        }
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          // postcss放在sass前和后都无关，最好放在sass-loader后（个人认为）
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['autoprefixer']
              }
            }
          },
          'sass-loader',
        ],
      },
    ]
  },
  // 在引入模块时不带文件后缀时，会来该配置数组里面依次添加后缀查找文件，
  // 因为ts不支持引入以 .ts, tsx为后缀的文件，所以要在extensions中配置，
  // 而第三方库里面很多引入js文件没有带后缀，所以也要配置下js
  // 这里只配置js, tsx和ts，其他文件引入都要求带后缀，可以提升构建速度
  resolve: {
    extensions: ['.js', '.tsx', '.ts']
  },
  // 插件配置
  plugins: [
    // 用于将静态资源引入html
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'), // 模板取定义root节点的模板
      inject: true, // 自动注入静态资源
    }),
    // 将环境变量注入业务中
    new webpack.DefinePlugin({
      'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV)
    })
  ]

}