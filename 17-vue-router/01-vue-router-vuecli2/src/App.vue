<template>
<!--
  路由的两种方式：
  1.router-link，html中
  2.编写js代码，js中
-->
  <div id="app">
    <!-- 使用路由3.通过router-link和router-view -->
    <!-- router-view决定渲染出来的组件放在什么位置 -->
    <router-link to="/home">首页</router-link>|
    <router-link to="/about">关于</router-link>|
    <!-- 函数写法 -->
    <!-- <button @click="userClick">用户</button> -->
    <router-link v-bind:to="/user/+userId">用户</router-link>
    <button @click="profileClick">档案</button>
    <!-- 加了v-bind可以使用mostache写法，可见路由还是函数写法更好维护 -->
    <!-- 路由html写法：<router-link v-bind:to="{path:'/profile', query:{name:"zty", age:"24", height:"177"}}">档案</router=link> -->
    <!-- 常规情况下路由每次调用都是重新创建组件，发起新的路由就路由的组件就会被销毁
    keep-alive保证在这个位置创建的部件都会保持缓存，exclude黑名单，include白名单，这里档案和用户不会维护活跃 -->
    <keep-alive exclude="Profile,User"><!-- 这里不能加空格 -->
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
  data (){
    return {
      userId: 'zty',
      profileInfo: {
        name: "zty",
        age: 24,
        height: 177
      }
    }
  },
  methods: {
    homeClick() {
      // 通过编写代码和html元素如button等非路由属性进行路由：
      // 编写代码1.push 等价于pushState
      // $表示与用户自定义的属性区分开来，所有组件源属性
      // $router该属性表示当前活跃的路由
      this.$router.push('/home')
      // 编写代码2.replace 等价于replaceState
      // this.$router.replace('/home')
      // $history.pushstate()也是可以的，但绕过了路由不推荐
      console.log("homeClick")
    },
    aboutClick() {
      this.$router.push('/about')
      // 3.replace 等价于replaceState
      // this.$router.replace('/about')
      console.log("aboutClick")
    },
    // 这里用的router-link因此该函数没有调用
    userClick() {
      this.$router.push('/user/' + this.userId)
      console.log("userClick")
    },
    profileClick() {
      let profileInfo = this.profileInfo
      this.$router.push({
        path: '/profile',
        query: {
          profileInfo
        }
      })
      console.log("profileClick")
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.active {
  color: red;
}
</style>
