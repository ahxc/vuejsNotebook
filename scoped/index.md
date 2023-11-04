scoped 原理利用属性选择器遍历每个组件实例添加。

```css
.className/Tag/...[data-v-hash] {

}
```

* 设置scoped后，一些父子继承样式设置类名或标签类型不同会失效，比如字体样式子组件无法继承，需要保持类名标签名等一致。
* 子组件设置了scoped，并且引入了样式，会插入新的data-v-hash
* 打破scoped方法可以使用穿透，仅在vue中有效。或者增加一个额外的公共样式style标签。

  ```css
  .box >>> input {
      width: 166px;
      text-align: center;
    }
  }

  .box /deep/ input{
      width: 166px;
      text-align: center;
  }

  .box ::v-deep input {
      width: 166px;
      text-align: center;
  }
  ```
