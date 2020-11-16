const path = require('path')
const webpack = require('webpack')
// 导入htmlWebpackPlugin
const htmlWbepackPlugin = require('html-webpack-plugin')
// 导入uglifyjs-webpack-plugin
const uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './src/main.js',
  output:{
    path: path.resolve(__dirname, 'dist/'),
    filename: 'bundle.js',
    // 此处一般开发用，打包到dist线上环境后根目录发生了变化不在需要
    // publicPath: 'dist/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }]
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'less-loader'
        }]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'img/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            // presets: ['@babel/preset-env']
            presets: ['es2015']//插件只允许 Babel 解析（parse） 特定类型的语法（而不是转换）。
          }
        }
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader'
        }
      }
    ]
  },
  resolve: {
    // alias:别名
    alias: {
      //指定vue使用开发环境vue.esm.js
      'vue$':'vue/dist/vue.esm.js'
      // vue.common.js :预编译调试时，CommonJS规范的格式，可以使用require("")引用的NODEJS格式。
      // vue.esm.js：预编译调试时， EcmaScript Module（ES MODULE)，支持import from 最新标准的。
      // vue.runtime.js ：生产的运行时，需要预编译，比完整版小30%左右，前端性能最优
      // vue.runtime.esm.js：生产运行时，esm标准。
      // vue.runtime.common.js:生产运行时，commonJS标准。 */
    }
  },
  plugins:[
    // 横幅插件，代码编辑打包后会出现这个字符串，如果输入开发人员人名
    // 则代码可追溯人员
    new webpack.BannerPlugin('最终解释权归zz所有'),
    // 自动生成一个index.htm文件并引用bundle.js包，可以指定模板
    // 将打包的js文件自动通过script标签插入body中
    new htmlWbepackPlugin({
      // 指定webpack目录下的index.html作为模板
      template: './index.html'
    }),
    // 项目js代码统一打包到bundle.js后，开发时不建议
    // 投入生产需要压缩(去掉空格等一些代码，降低可读性)
    new uglifyjsWebpackPlugin()
  ]

}
