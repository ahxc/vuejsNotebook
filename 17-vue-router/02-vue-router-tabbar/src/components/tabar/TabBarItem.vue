<template>
  <div class="tab-bar-item" @click="itemclick">
    <div v-if="isactive">
      <slot name="item-icon-fill"></slot>
    </div>
    <div v-else name="item-icon">
      <slot name="item-icon"></slot>
    </div>
    <!-- 在插槽里设置属性很容易被其他模板替换掉，所以建议写一个div包裹插槽，插槽相关的样式属性可以在div里设置 -->
    <!-- <div :class="{active: isactive}"> -->
    <div :style="activestyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  // 父传子
  props: {
    path: String,
    activecolor: {
      type: String,
      default: "blue"
    }
  },
  data () {
    return {
      // isactive: true
    }
  },
  computed: {
    isactive () {
      // 当前路由不等于item的path返回-1，则只有不等于-1的为当前选中的tabbaritem
      return this.$route.path.indexOf(this.path) !== -1
    },
    // 如果激活了传递指定的样式
    activestyle () {
      return this.isactive ? {color: this.activecolor} : {}
    }
  },
  methods: {
    itemclick () {
      console.log(this.$route.path)
      // if (this.path == this.$route.path) return
      this.$router.push(this.path)
    }
  }
}
</script>

<style scoped>
  .tab-bar-item {
    flex: auto;

    /* 节点距离包裹的组件tabbar顶部 */
    margin-top: 0%;
    vertical-align: middle;
    margin-bottom: 0%;

    text-align: center;
    text-emphasis-color: initial;
    font-size: 200%;
  }

  .tab-bar-item img {
    /* height: 45%; */
    width: 25%;
  }

  /* tabbaritem样式写死不方便选择 */
  /* .active {
    color: blueviolet;
  } */
</style>