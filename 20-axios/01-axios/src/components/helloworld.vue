<template>
  <span>{{resdata}}</span>
</template>

<script>
import axios from "axios"
export default {
  name: "helloworld",
  data() {
    return {
      resdata: ""
    }
  },
  created() {
    axios({
      url: "http://123.207.32.32:8000/home/multidata"
    })
    .then(res=>{
      this.resdata = res
    })
  }
}
</script>

<style scoped>

</style>