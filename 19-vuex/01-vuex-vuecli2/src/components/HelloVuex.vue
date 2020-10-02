<template>
  <div>
    <h3>{{$store.state.counter}}</h3>
    <h3>{{$store.getters.more20stu}}</h3>
    <h3>{{$store.getters.moreagestu(8)}}</h3>
    <h3>{{$store.state.info.name}}</h3>
  </div>
</template>>

<script>
export default {
  name: "HellowVuex",
}
</script>

<style scoped>
</style>