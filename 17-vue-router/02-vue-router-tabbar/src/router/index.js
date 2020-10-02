import Vue from "vue"
import Router from "vue-router"

/* 1.安装路由 */
Vue.use(Router)

const routes = [
  {
    path: "",
    redirect: "/user"
  },
  {
    path: "/user",
    // 懒加载，拼写错误不报错，作为自定义属性
    component: () => import ("../pages/user/user")
  },
  {
    path: "/find",
    component: () => import ("../pages/find/find")
  },
  {
    path: "/community",
    component: () => import ("../pages/community/community")
  },
  {
    path: "/data",
    component: () => import ("../pages/data/data")
  }
]

/* 2.配置关系并导出 */
export default new Router({
  routes,
  // 修改模式为history，删除井号
  mode: "history"
})