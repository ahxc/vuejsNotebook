const path = require('path')

module.exports = {
  entry: './src/main.js',
  output:{
    // 打包目的文件夹根目录
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    // 为打包文件夹dist内的所有文件的访问url(只有文件名)加上当前的目录路径dist
    publicPath: 'dist/'
  },
  module: {
    rules: [
      {
        // 匹配css文件，css需要的loader，用//括起来
        test: /\.css$/,
        // css-loader只负责css文件加载，不负责解析渲染，要解析需要使用style-loader
        // loader加载顺序从右至左
        use: [
          {loader: 'style-loader'}, {loader: 'css-loader'}
        ]
      },
      {
        // 匹配less文件，less需要的loader
        test: /\.less$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
          {loader: 'less-loader'}
        ]
      },
      {
        // 匹配png/jpg/gif格式图片
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // 图片小于该限制将图片转成base64字符串，不需要额外模块加载，大于该限制需要使用file-loader
              limit: 8192,// 配置8kb的比较多
              // 打包文件路径，hash防重复
              // img当前目录，[name]文件名，[hash:8]hash截取8位，[ext]表示extension后缀
              name: 'img/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.js$/,
        // 在对es6js语法进行转换的时候排除node_modules文件夹的js和bower的js
        exclude: /(node_modules|bower_components)/,
        use: {
          // es6转换es5的loader
          loader: 'babel-loader',
          options: {
            //如果要使用@babel/preset-env这里需要在根目录新建一个babel的文件
            // presets: ['@babel/preset-env']
            // babel：js编译互转工具，不需要等待浏览器兼容一门新语言
            presets: ['es2015']// es 6
          }
        }
      }
    ]
  }
}
