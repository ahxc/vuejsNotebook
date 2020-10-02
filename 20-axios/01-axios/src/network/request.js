/* 该文件用以封装第三方框架axios的依赖，防止每个js导入axios，如果axios不再维护，则修改新框架是致命性的 */
import axios from "axios"

// 考虑到这个文件的扩展性不加入default
// 留两个接口参数用来接收成功和失败后的函数
export function request(config, success, failure) {
  // 创建axios实例
  const instace = axios.create({
    url: "http://123.207.32.32:8000/home/multidata",
    timeout: 5000
  }),

  instance(config)
  .then(res=>{
    success(res)
  })
  .catch(err=>{
    failure(err)
  })
}