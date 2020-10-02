import Vue from 'vue'
import App from './App'
import {axiosrequest} from "./network/request"

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})

axiosrequest({
  url: "/home/multidata",
  timeout: 5000
})
.then(res=>{
  console.log(res)
})
.catch(err=>{
  console.log(err)
})