import Vue from 'vue'
import App from './App'
// 4.导入store以供使用
import store from "./components/store/index"

Vue.config.productionTip = false

new Vue({
  el: '#app',
  // 5.将store放入主体实例app，一个主体实例全局最好只用一个store
  store,
  render: h => h(App)
})