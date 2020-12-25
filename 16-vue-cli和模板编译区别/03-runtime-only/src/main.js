import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  // template在打包时就编译成render
  render: h => h(App)
  // 方法1.h函数可比作：createdElemnet("标签", {标签的属性：值,}, ["dom"])
  // 标签指id，属性即class，name等，dom即<html>包裹的元素，即render函数
  // <div id=h2 class="">dom</div>
})