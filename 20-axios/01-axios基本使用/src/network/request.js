/* 该文件用以封装第三方框架axios的依赖，防止每个js导入axios，如果axios不再维护，则修改新框架是致命性的 */
import axios from "axios"

// 1.创建axios实例：为了该文件的扩展性固不用default
export function actualrequest(config) {
  const instance = axios.create({
    baseURL: "http://123.207.32.32:8000",
    timeout: 5000
  })
  return instance(config)
}

/* axios其他的使用方法 */
// 全局请求等待时间
axios.defaults.timeout = 5000
// 全局请求基础域名
axios.defaults.baseURL = "http://123.207.32.32:8000"

const config1 = {
  url: "http://123.207.32.32:8000/home/data",
  method: "get",
  params: {
    type: "pop",
    page: 1
  }
}
axios(config1)
.then(res => {
  console.log(res)
})

// axios实例的创建
const instance1 = axios.create({
  baseURL: "http://123.207.32.32:8000",
  timeout: 5000
})
const config2 = {
  url: "/home/multidata",
  params: {
    type: "pop",
    page: 1
  }
}
instance1(config2).then(res => {
  console.log(res)
})

axios
.get("http://123.207.32.32:8000/home/multidata")
.then(res => {
  console.log(res)
})

// 全局请求，但随着业务扩大，一般通过nginx进行分布式的应用
axios.all([
  // 两个请求
  axios(config1),
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

