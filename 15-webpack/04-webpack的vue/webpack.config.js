const path = require('path')

module.exports = {
  entry: './src/main.js',
  output:{
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'dist/'
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
          loader: 'less-loader'//less文件loader
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
            // 如果要使用@babel/preset-env这里需要在根目录新建一个babel的文件
            // presets: ['@babel/preset-env']
            presets: ['es2015']
          }
        }
      },
      {
        // 加载.vue文件的loader
        test: /\.vue$/,
        use: {
          loader: 'vue-loader'
        }
      }
    ]
  },
  resolve: {
    // 导入模块简写省略指定后缀
    // extensions: ['.js', '.css', '.vue'],
    // alias: 别名 html中引用别名路径前加~
    alias: {
      // import Vue from 'vue/dist/vue.esm.js' 的别名
      // import Vue from vue 同时指定要运行的版本
      'vue$': 'vue/dist/vue.esm.js'
      // 指定vue使用node_modules/vue/dist下的vue.esm.js版本，不配置该项，运行模式为runtime-only
      // 表示任何template都无法编译，配置后模式为runtime-compiler
    }
  }
}