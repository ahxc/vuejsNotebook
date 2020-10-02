<template>
  <div id="tab-bar">
    <!-- 不设置插槽无法插入TabBarItem元素 -->
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "TabBar"
}
</script>

<style scoped>
  #tab-bar {
    display: flex;
    background-color:#f6f6f6;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    /* box-shadow: 100px,100px,100px,rgba(100, 100, 100, 100); */
  }
</style>