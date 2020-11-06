<template>
  <div id="app">
    <!-- 通过共享counter来实现两个组件之间的信息同步 -->
    <h3>App内容</h3>
    <h3>{{$store.state.counter}}</h3>
    <h3>{{$store.getters.more20stu}}</h3>
    <h3>{{$store.getters.moreagestu(8)}}</h3>
    <h3>{{$store.state.info.name}}</h3>
    <!-- getters方法是不区分模块还是主体store，可以直接调用，要预防重名 -->
    <h3>{{$store.getters.moduleAGetters}}</h3>
    <!-- 下面这种写法不规范 -->
    <!--
    <button @click="$store.state.counter++">+</button>
    <button @click="$store.state.counter--">-</button>
    -->
    <button @click="useIncrement">+</button>
    <button @click="useDecrement">-</button>
    <button @click="useAddnumber(5)">+</button>
    <button @click="useUpdatainfoandPromise(payload='永不过时')">优雅测试</button>

    <h3>Hello Vuex内容</h3>
    <hello-vuex/>

    <h3>modulesA的内容</h3>
    <!-- 比较奇特的是，store的moduleA模块的名字放在了state中，但后续不需要加state -->
    <h3>{{$store.state.moduleA.name}}</h3>
    <button @click="useModulesMutations('优雅的改名')">改名</button>
    <h3>{{$store.getters.moduleAGettersplus}}</h3>
    <button @click="usemoduleAactions">通过actions改名</button>
  </div>
</template>

<script>
import HelloVuex from "./components/HelloVuex"

export default {
  name: 'App', 
  components: {
    HelloVuex
  },
  methods: {
    useIncrement () {
      // 调用store中的mutation方法
      this.$store.commit("increment")
    },
    useDecrement () {
      this.$store.commit("decrement")
    },
    // n参数称为负载payload，多个参数可以传入字典
    useAddnumber(n) {
      // mutation1.普通的提交封装
      this.$store.commit("addnumber", n)
      // mutation2.特殊的提交封装
      /* this.$store.commit({
        type: "addnumber",// 事件类型
      }) */
    },
    // action异步的处理步骤1.组件方法调用aciton方法
    useUpdatainfo(payload) {
      // 与mutation的this.$store.commit("updatainfo", "payload")有区别，官方图19-03，同时dispatch是异步操作
      this.$store.dispatch("updatainfo", payload)
    },
    useUpdatainfoandPromise(payload) {
      // 调用的index.js中action包含promise的方法，then写在了Appvue的实例方法内
      // 当然then也还是可以写promise方法内的，先后顺序猜测是先执行promise内的
      // 再执行dispatch这的
      this.$store.dispatch("asynchronization", payload)
      .then(res => {
        // 输出优雅永不过时
        console.log("优雅，" + res)
      })
    },
    useModulesMutations(payload) {
      this.$store.commit("modulesMutations", payload)
    },
    usemoduleAactions() {
      this.$store.dispatch("moduleAactions")
    }
  }
}
</script>