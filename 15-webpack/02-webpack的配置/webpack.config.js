// 1.commonJS导入node环境下的path包，
// 需要使用npm init初始化项目环境node包，会生成packge.json文件
const path = require('path')

// 2.配置webpack的入口和出口
module.exports = {
  // 待打包的入口文件
  entry: './src/main.js',
  output:{
    // 拼接路径，类似py path.join，__dirname表示当前文件所在目录的绝对路径
    // __filename 表示当前文件的绝对路径
    path: path.resolve(__dirname, 'dist'),
    // 打包后的文件名
    filename: 'bundle.js'
  }
}

// 3.配置好后再打包只需输入webpack，webpack是配置文件名