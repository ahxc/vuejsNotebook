/* mixin是一类需要慎重使用的方法，官方建议全局慎用，使用不当会引起项目结构混乱不堪 */
/* 1.创建公共函数部分，单独文件夹 */
// $_表示mixin方法，区分已有方法
export const $_backTop = {
  // 多种属性都是是可混入的
  data: function () {
    return {
      showBackTop: false
    };
  },
  created: function () { console.log(1); },
  methods: {
    backTop: function () {
      this.$refs.scroll.scrollTo(0, 0, 300);
    }
  }
};

/* 2.组件中注册混入 */
import { $_backTop } from "./config";
const vm = new Vue({
  created: function () { console.log(2); },
  mixins: [$_backTop]
  // ! 方法已经混入按常规调用，也没有什么特别前缀
})

/* 结果：输入1,2两个组件合并但不覆盖 */