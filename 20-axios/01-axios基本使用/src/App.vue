<template>
  <div id="app">
    <h3>app内容</h3>
    <span>{{result}}</span>
    <h3>helloworld内容</h3>
    <helloworld/>
  </div>
</template>

<script>
  import axios from "axios"
  import helloworld from "./components/helloworld"

  export default {
    name: 'App',
    components: {
      helloworld
    },
    data(){
      return {
        result: "",
      }
    },
    // 生命周期函数创建成功后执行
    created() {
      axios({
        url: "http://123.207.32.32:8000/home/multidata"
      })
      .then(res=>{
        // console.log(res),
        this.result = res
      })
    }
  }
</script>

<style>
</style>