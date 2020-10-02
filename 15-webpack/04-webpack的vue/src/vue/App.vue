<template id="Appt">
  <div>
    <h2 class='title'>{{message}}</h2>
    <button @click="btnclick(name)">按钮</button>
    <button @click="btnclicktest(name)">按钮</button>
    <h2>{{name}}</h2>
    <!-- 使用Cpn组件的模板替换 -->
    <Cpn/>
  </div>
</template>

<script type="text/ecmascript-6">
// 导入Cpn组件
import Cpn from './Cpn.vue'
export default {
  name: "App",
  template: "#Appt",
  data() {
    return {
      message: "hello webpack",
      name: "对接测试",
      }
  },
  components: {
    Cpn//注册Cpn组件
  },
  methods: {
    btnclick(name) {console.log(name)},
    btnclicktest(name) {console.log(name)},
  },
};
</script>

<style scoped>
/* scoped：仅仅应用到style元素的父元素及其子元素。 */
.title {
  color: green;
}
</style>