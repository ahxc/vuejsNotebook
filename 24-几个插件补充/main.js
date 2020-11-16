import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'


//main.js中导入toast插件的安装js并使用
import toast from 'components/common/toast'
Vue.use(toast)

// 导入组件
import Toast from './Toast'
// 插件的写法
const plugin = {}
plugin.install = function (Vue) {
  const toastConstrustor = Vue.extend(Toast)
  const toast = new toastConstrustor()
  // 将组件挂载创建的一个新节点
  toast.$mount(document.createElement('div'))
  // toast.$el对应的就是div
  document.body.appendChild(toast.$el)
  // 给组件定义原型属性
  Vue.prototype.$toast = toast
}
// 后续调用toast内的show方法并传入数据
this.$toast.show("弹窗信息", 2000)


// 2.使用懒加载插件，需要安装vue-lazyload
// v-bind:src替代为v-lazy=
// :key是为了防止刷新页面或图片更改时图片不更新
<img v-lazy="src" :key="src">
Vue.use(VueLazyLoad,{
  // 占位图
  loading:require('./assets/img/common/placeholder.png')
})


// 3.解决移动端300ms延迟，需要安装fastclick
FastClick.attach(document.body)