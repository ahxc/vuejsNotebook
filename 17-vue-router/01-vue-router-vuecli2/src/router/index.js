/* vue cli2 index页面的路由配置 */

import Vue from 'vue'
// 安装路由2. 导入路由对象并调用
import Router from 'vue-router'
// 导入组件文件夹components里的homepage组件
// @是老师在webpack给..取得alias别名
import Home from '@/components/Home'

// 安装路由2. 导入路由对象并调用
Vue.use(Router)

// 使用路由2.配置路由和组件之间的对应关系
const routes = [
  /* {
    // 初加载url无相对路径时默认重定向到/home
    path: '',
    redirect: '/home'
  }, */
  {
    // home前端路由地址，
    // 路由的发生：发生点击事件，触发地址改变，对应地址对应路由调动组件
    path: '/home',
    name: 'Home',
    // 路由的组件名
    component: Home,
    // meta为类添加元属性
    meta: {
      title: '首页'
    },
    // home的子路径
    children: [
      // {
      //   path: '',
      //   redirect: '/home/news'//缺省时候重定向到/home/news
      // },
      {
        // 子嵌套路由 无须加/
        path: 'news',
        name: 'News',
        // 懒加载组件，其实就是path启动路由后调用箭头函数导入HomeNews函数并注册
        component: () => import('@/components/HomeNews')
        /* 懒加载：懒加载也叫延迟加载，指的是在长网页中延迟加载图像，
        是一种很好优化网页性能的方式。用户滚动到它们之前，可视区域外的图像不会加载。
        与预加载相反 */
      },
      {
        path: 'message',
        name: 'Message',
        component: () => import('@/components/HomeMessage') //懒加载组件
      }
    ]
  },
  {
    path: '/about',//about 前端路由地址
    name: 'About',
    // 懒加载组件
    component: () => import('@/components/About'),
    beforeEnter: (to, from, next) => {
      console.log('来自' + from.path + ',要去' + to.path)
      next()
    },
    meta: {
      title: '关于'
    }
  },
  {
    // 动态路由，:表示这是一个变量参数值
    path: '/user/:userId',
    name: 'User',
    // 懒加载组件 @，src别名
    component: () => import('@/components/User'),
    meta: {
      title: '用户'
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    // 懒加载组件
    component: () => import('@/components/Profile'),
    meta: {
      title: '档案'
    }
  }
]

// 安装路由3. 创建路由实例，并传入路由映射配置
const router = new Router({
  // 传入应用关系
  routes,
  // 修改路由模式为history，另一个是hash
  mode: 'history',
  // class属性统一设为class=active
  linkActiveClass: 'active'
})

// 全局导航守卫，用于监听所有即将跳转的路由，做一些检查贴标过滤等操作。
// 比如单页面spa标题在html是固定的，但可以根据获得的路由改变标题如下
// to：路由对象要跳转的路径，from：路由对象，来自哪个路由，next，执行beforeEach函数体
router.beforeEach((to, from, next) => {
  // 给目标路由的页面的title赋值，to.meta只能调用到父类属性，自定义元属性在matched里面
  // document浏览器文档
  document.title = to.matched[0].meta.title
  // 必须调用，不调用不会跳转
  next()
})

// 后置钩子，和beforeeach不同的是路由结束后调用且不需要next
router.afterEach((to, from) => {
  console.log('后置钩子调用了----')
})

//4. 导出router实例供index的相关实例使用
export default router

/* 懒加载的方式 */
// 1.结合Vue的异步组件和webpack的代码分析：const Home = resolve => { require.ensure(['/components/Home.vue'], 
// () => {resolve(require('../components/Home.Vue'))})}; 不推荐
// 2.Amd写法：const about = resolve => require(['../components/about.vue'], resolve);
// 3.es6最新写法：即箭头函数
// 一个懒加载对应一个js打包文件，路由应该多多使用懒加载使得打包递送的文件尽可能的小