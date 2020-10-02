import Vue from 'vue'
import App from './App'
import axios from "axios"

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App)
})

// 导入axios实例
import {actualrequest} from "./network/request"

// 2.使用实例axios，
// axios返回的就是一个promise，因此调用它时可直接使用请求后的处理方法：then和catch
actualrequest({
  url: "/home/multidata"
})
.then(res=>console.log(res))
.catch(err=>console.log(err))