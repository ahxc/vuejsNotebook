<template>
  <div class="page-contianer">
    <h2>这是用户界面</h2>
    <p>这里是用户页面的内容。</p>
    <p>用户ID是: {{ userId }}</p>
    <!-- 也可以直接写userId函数体内的语句 -->
    <!-- {{$router.params.userId}} -->
    <button @click="btnClick">按钮</button>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'User',
  computed: {
    // 此userId与app中的实例属性urserId不同，调用的是路由url中的参数
    userId() {
      return this.$route.params.userId
    }
  },
  methods: {
    btnClick() {
      // 所有组件都继承自vue的原型
      console.log(this.$router)
      console.log(this.$route)
      this.$router.push('/user/:userId')
      // 调用vue原型的test
      this.test()
    }
  }
}
</script>
<style scoped>
</style>