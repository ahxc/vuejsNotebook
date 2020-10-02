<template>
  <div id="app">
    <router-view></router-view>
    <tab-bar>
      <!-- 传值path给tab-bar-item组件 -->
      <tab-bar-item path="/user" activecolor="blue">
        <!-- 因为使用插槽item的素材代码src位置发生了相对变化 -->
        <!-- 以后导航栏如果要拓展TabBarItem，只需在这里添加一栏TabBarItem即可 -->
        <!-- 使用插槽只需修改App.vue这一处位置，如果不用，TabBarItem中每加一个TabBarItem，Appvue对应需要写TabBarItem一个模板位 -->
        <img slot="item-icon-fill" src="./assets/img/tabbar/user-fill.svg" alt="">
        <img slot="item-icon" src="./assets/img/tabbar/user.svg" alt="">
        <div slot="item-text">我的</div>
      </tab-bar-item>
      <tab-bar-item path="/data" activecolor="blue">
        <img slot="item-icon-fill" src="./assets/img/tabbar/data-fill.svg" alt="">
        <img slot="item-icon" src="./assets/img/tabbar/data.svg" alt="">
        <div slot="item-text">数据</div>
      </tab-bar-item>
      <tab-bar-item path="/community" activecolor="blue">
        <img slot="item-icon-fill" src="./assets/img/tabbar/community-fill.svg" alt="">
        <img slot="item-icon" src="./assets/img/tabbar/community.svg" alt="">
        <div slot="item-text">社区</div>
      </tab-bar-item>
      <tab-bar-item path="/find" activecolor="blue">
        <img slot="item-icon-fill" src="./assets/img/tabbar/find-fill.svg" alt="">
        <img slot="item-icon" src="./assets/img/tabbar/find.svg" alt="">
        <div slot="item-text">发现</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
  import TabBar from "./components/tabar/TabBar"
  import TabBarItem from "./components/tabar/TabBarItem"
  export default {
    name: 'App',
    components: {
      TabBar,
      TabBarItem
    }
  }
</script>

<style>
  /* style中导入要加@ */
  @import url('./assets/css/base.css');
</style>