
// nexttick 是DOM更新后的一个回调函数，在函数内部获取的DOM元素都是更新之后的。如果要在函数外部获取，可以采用async，awai方法。

/* 
  vue 异步更新（异步渲染）：将多次数据变化引起的DOM更新合并成一次，只需更新一次DOM
  如果不采用这种方法，数据改变100次就要去更新100次DOM，十分消耗性能；
*/

// ! nexTick 的作用或使用场景
/*
  1.数据更新后想要获取更新完毕的DOM及其属性，比如高度计算表格元素自适应尺寸，元素位置尺寸放到或滚到固定的位置。
*/

// 修改数据
vm.msg = 'Hello';
// DOM 还没有更新
Vue.nextTick(function () {
  // DOM 更新了
});

// 作为一个 Promise 使用 (2.1.0 起新增，详见接下来的提示)
Vue.nextTick()
  .then(function () {
    // DOM 更新了
  });

import { ref, nextTick } from 'vue';

const count = ref(0);

async function increment() {
  count.value++;

  // DOM 还未更新
  console.log(document.getElementById('counter').textContent); // 0

  await nextTick();
  // DOM 此时已经更新
  console.log(document.getElementById('counter').textContent); // 1
}