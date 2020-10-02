import Vue from 'vue'
import App from './App'

// false生产环境，true开发环境
Vue.config.productionTip = true

/* 勾选了eslint会进行强制的es6标准检查
  在config/index.js中关闭 */
new Vue({
  el: '#app',
  components: { App },
  // 组件里使用template的都是runtime-compiler模式
  template: '<App/>'// 节点没有元素时可以只写尾部</>
  // 方法2.直接传入一个组件
})