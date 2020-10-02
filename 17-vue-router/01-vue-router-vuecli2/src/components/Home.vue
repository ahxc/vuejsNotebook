<template>
  <div class="page-contianer">
    <h2>这是首页</h2>
    <p>components组件集合文件夹</p>
    <!-- 使用路由3.通过router-link和router-view -->
    <!-- router-link：全局组件链接，类似a标签
      这种路由写法代替<a ref=url>的方法可以不用刷新页面 -->
    <!-- to类似ref，用于跳转路径
      tag类似type=button，指定渲染成什么组件
      replace是history.replaceState方法，不会留下历史记录，所以指定replace的情况下，后退键不能返回到上一个页面，绕过
      lintactiveclass: 匹配成功后的class属性，名字router-link-active-->
    <router-link to="/home/news" replace>新闻</router-link>|
    <router-link to="/home/message">消息</router-link>
    <!-- router-view路由调用后展示的组件 -->
    <router-view/>
  </div>
</template>

<script type="text/ecmascript-6">
/* 使用路由1.创建组件 */
export default {
  name: 'Home',
  data() {
    return {
      path: '/home/news'
    }
  },
  // 生命周期函数，homevue创建后的事件
  created() {
    console.log('Home组件被创建了')
    this.$router.push('/home/news')
  },
  // 生命周期函数，homevue离开后的事件
  destoryed() {
    console.log('Home组件被销毁了')
  },
  // 生命周期函数，组件活跃时做的事件，但只有keep-alive启用后才有效
  activated(){
    console.log('调用actived')
    this.$router.push(this.path)
  },
  // 生命周期函数，但只有keep-alive启用后才有效
  // deactivated(){
  //   console.log('调用actived')
  //   console.log(this.$route.path)
  //   this.path = this.$route.path
  // },
  beforeRouteLeave(to, from, next) {
    console.log(this.$route.path)
    this.path = this.$route.path
    next()
  }
}
</script>
<style scoped>
</style>