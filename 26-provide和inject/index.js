/*
provide，inject和mixin用法类似，区别在于只provide指定的元素
! 注意：provide 和 inject 绑定并不是可响应的。这是刻意为之的。然而，
! 如果你传入了一个可监听的对象，那么其对象的 property 还是可响应的。
 */
export const $_backTop = {
  data: function () {
    return {
      city: String,
      nameObj: Object,
      age: Number
    };
  },

  /* 1.提供指定元素 */
  provide() {
    return {
      nameObj: this.nameObj,   //传入一个可监听的对象
      cityFn: () => this.city,  //通过computed来计算注入的值
      age: this.age  // 直接传值
    };
  },
};

/* 2.子/孙子组件中inject注入，注意，是子孙后代方能使用 */
export default {
  inject: ['nameObj', 'age', 'cityFn'],
  created: function () { console.log(2); },
  methods: {
    click: function () {
      console.log(this.nameObj);//通过this调用
    }
  }
};