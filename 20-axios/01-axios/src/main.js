import Vue from 'vue'
import App from './App'
import axios from "axios"

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App)
})
/* 
// 全局请求等待时间
axios.defaults.timeout = 5000
// 全局请求基础域名
axios.defaults.baseURL = "http://123.207.32.32:8000"

// axios支持promise

const config = {
  url: "http://123.207.32.32:8000/home/data",
  method: "get",
  params: {
    type: "pop",
    page: 1
  }
}
axios(config)
.then(res => {
  console.log(res)
})

axios
.get("http://123.207.32.32:8000/home/multidata")
.then(res => {
  console.log(res)
})

// 全局请求，但随着业务扩大，一般通过nginx进行分布式的应用
axios.all([
  axios(config),
  axios.get("http://123.207.32.32:8000/home/multidata")
])
.then(
  // 1.获得所有并发结果的list集合，只有一个res能运行
  res => {console.log(res)},
  // 2.获得各自的结果
  axios.spread((res1, res2) => {
    console.log(res1),
    console.log(res2)
  })
)

// axios实例的创建
const instance1 = axios.create({
  baseURL: "http://123.207.32.32:8000",
  timeout: 5000
})

instance1({
  url: "/home/multidata"
}).then(res => {
  console.log(res);
})

instance1({
  url: "/home/multidata",
  params: {
    type: "pop",
    page: 1
  }
}).then(res => {
  console.log(res)
})

const instance2 = axios.create({
  baseURL: "http://123.207.32.32:8000",
  timeout: 5000
})
 */
import {request} from "./network/request"

// 对应request里的config，success，error，分别是url配置，成功请求和失败请求后的回调函数
request(
  {url: "/home/multidata"},
  res => {console.log(res)},
  err => {console.log(res)})