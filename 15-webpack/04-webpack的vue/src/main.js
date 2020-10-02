const {add, mul} = require("./js/mathUtils.js")
console.log(add(10, 20))
console.log(mul(10, 10))

import info from './js/info'
console.log(info.name)
console.log(info.age)

require('./css/normal.css')
require('./css/special.less')
document.writeln("hello,zzzz!")

// 从别名后的vue导入Vue.js
import Vue from 'vue'

// 导入app.js中export默认对象，并命名为App，一般写法
// import App from './js/app.js'

// 导入App.vue中export默认对象，并命名为App
import App from './vue/App.vue'

new Vue({
  el: "#app",
  // <App/>表示使用组件App的模板以<App><App/>的形式替换el挂载的内容
  // 注意，作用域还是自身子组件
  template: '<App/>',
  data: {
    name: "测试",
    message: "测试一下"
  },
  components: {
    // 把App注册局部组件
    App
  }
})