import Vue from 'vue'
import App from './App'
// 导入配置好的路由
import router from './router'

// 在vue的原型上添加test方法
Vue.prototype.test = function () {
  console.log("test")
}
Vue.config.productionTip = false

new Vue({
  el: '#app',
  // 安装路由4. 在Vue实例中挂载创建的路由实例
  // 与以往不同的是，组件不再在子组件app中形成树，而是在router中形成路由组件树
  router,
  render: h => h(App)
})