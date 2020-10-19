import axios from "axios"

export function axiosrequest(config) {
  const instance = axios.create({
    baseURL: "http://123.207.32.32:8000"
  })

  // 请求拦截器
  instance.interceptors.request.use(
    res=>{
      console.log(res);

      // 拦截器的作用，1当网络请求等待普遍比较长时，在这里拦截请求添加等待动画，如转圈
      // 2.config中的一些信息不符合标准，猜测反爬
      // 3.某些网络请求需要一些特殊信息，如登录需要token

      // 请求的配置被拦截，返回配置继续发送请求不然报错
      return res},
    // 这里表示请求发送失败的捕捉，一般不会触发，此处不是请求失败
    err=>{console.log(err)})

  // 响应拦截器
  instance.interceptors.response.use(
    res=>{
      console.log(res);

      // 请求的网页所有数据被拦截，不返回为undefined
      // 响应拦截可以用作数据过滤，比如只需要data数据return res.data
      return res
    },
    // 响应失败还是比较普遍
    err=>{console.log(err)}
  )
  return instance(config)
}
  



  