[toc]

### 1.v-if和v-show区别

 **v-if有更高的切换开销**。

v-if是真正的条件渲染，因为它会确保在切换过程中事件监听器和子组件被销毁和重建； v-if也是惰性的，如果初识渲染时条件为假，则什么都不需要做，直到条件第一次变为真时才开始渲染条件块；

**v-show有更高的初始渲染开销**。

如果需要频繁切换，v-show更好，运行条件不太可能改变时，则用v-if。 v-if不符合条件时，在vue内部调用的是一个_e的方法，创建一个空节点；但v-show无论是符合还是不符合，没有进行节点的创建，只是改变了display的值，none，不显示且不占据位置。 

### 2.如何让css只在当前组件生效？

```html
<style scoped>
```

### 3.v-model的使用；vue中的标签如何绑定事件？

v-model可以实现双向绑定，一般在input或者select或者文本域配合value使用。

v-on @

### `4.NextTick是做什么？

[掘金](https://juejin.cn/post/6844903843197616136)

说明：nextTick是在下次DOM更新循环之后执行延迟回调，在修改数据之后使用，则可以在回调中获取更新后的DOM。 场景：需要在视图更新之后，基于新的视图进行操作。

```vue
<template>
    <div @click="btn" ref="btns">{{msg}}</div>
<template>
<script>
    export default {
  name: 'app',
  data() {
    return {
      dialog: false,
      msg: '旧数据'
    }
  },

  methods: {
    btn() {
      this.msg = '新洗心心心';
      // 直接打印出现的是旧数据，在nextTick里出现的是新数据
      console.log(this.$refs.btns.innerHTML);
      this.$nextTick(() => {
        console.log(this.$refs.btns.innerHTML);
      })
    }
  },
 }
</script>
```

### 5.为什么vue的data必须是个函数？

Object是引用数据类型，如果不用function返回，每个组件的data都是内存的同一个地址，一个数据改变了其他也改变了。

JavaScript**只有函数{}构成作用域**，对象的{}以及if(){}都不构成作用域，data是一个函数时，每个组件实例都有自己的作用域，每个实例相互独立，不会相互影响。

同一个组件被复用多次，会创建多个实例。这些实例用的是同一个构造函数，如果 data 是一个对象的话。那么所有组件都共享了同一个对象。为了保证组件的数据独立性，要求每个组件必须通过 data 函数返回一个对象作为组件的状态。

关于这点对于微信小程序的理解：微信小程序不是函数，他是通过setData来改变数据，可能是切断引用链

### 6.说说对keep-alive的理解

[掘金](https://juejin.cn/post/6844903837770203144)

keep-alive是一个抽象组件：它自身不会渲染一个 DOM 元素，也不会出现在父组件链中；使用keep-alive包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。

```vue
<keep-alive>
    <router-view v-if="$route.meta.keepAlive"/>
</keep-alive>
<router-view v-if="!$route.meta.keepAlive"/>

/* 另一种 */
<keep-alive :include="whiteList" :exclude="blackList" :max="amount">
  <router-view></router-view>
</keep-alive>
```

可以通过keep-alive元素配置也可以通过route里的meta对象配置。

### 7.vue数据响应式原理

[简书](https://www.jianshu.com/p/4dff7c2cdaaa)

1、建一个 dep 对象，与当前数据对应，通过 Object.defineProperty() 覆写了对象属性的原 set、get 方法，实现“拦截”。

2、然后通过Vue.prototype.$watch()传入一个函数 getter 触发数据的 get 方法，从而建立依赖关系。

3、写入数据时触发 set 方法，借助 dep.notify() 发布通知，进而 watcher 进行更新。

```javascript
Object.defineProperty(obj, props, value)
Object.definePropertys(obj, {props:value, props:value...})
// 括号内其他参数
{
	configurable: true,// 是否可通过delete删除该属性
	enumerable: true,// 是否可通过foreach, for等等迭代
	get:,// 重要，todo中用到过，访问该属性时调用的函数，默认undefind
	set:,// 重要，结合get，给属性设置新值调用函数，默认undefined，接收唯一参数
	// get set在函数中是默认存在的，只不过都是undefined
}
```

### 8.vue如何检测数组变化

[CSDN](https://blog.csdn.net/XuM222222/article/details/99950241)

1.覆写数组的push、pop、shift、unshift、splice、sort、reverse的方法

2、如果浏览器支持**\_\_proto\_\_属性**，则覆写方法定义在原型上，反之直接覆写

3、如果浏览器支持**\_\_proto\_\_属性**使用push等方法时先从其原型arrayMethods上寻找push方法，不支持则直接从数组本身查找方法，没有就原型上查找。两者都通过响应式原理中ob.dep.notify()通知watcher，更新并render

ob.dep.notify()

### `9.为什么vue采用异步渲染

**什么是异步渲染：**

vue是组件级的更新，那么组件涉及的数据可能非常多，如果一改就立刻更新，会非常损耗性能，尤其是在vue2.0以后，vue还会计算通知依赖于更改数据的其他组件，这中间损耗的性能就更为严重了。所以vue采用异步渲染，在本轮数据更新后去更新视图。 [www.sohu.com/a/227583981…](https://www.sohu.com/a/227583981_500651)

### 10.vue通信的几种方式

[SegmentFault](https://segmentfault.com/a/1190000019208626)

1、v-bind:和props父传子，

2、v-on@和$emit子传父

3、vuex state mutation action getter

4、localstorage

5、总线bus（不推荐）数据流结构不清晰

6、$attrs和$listeners

7、$parent/$children（不推荐）数据流结构不清晰

8、this.$refs.name，ref="name"，ref写在模板上即dom，写在组件标签上即组件

9、provide和inject

### 11.computed、watch和method的区别

method：函数调用，每使用一处，就会执行一次，开销比较大。

computed：属性调用，计算属性是具备缓存的，只有当依赖的data数据发生变化时才会重新计算。computed的由来还有一个重要原因，就是防止文本插值中逻辑过重，导致不易维护。

watch：监听属性的变化，watch更加适用于监听某一个值的变化并做对应的操作，比如请求后台接口等 数据量大。

需要缓存的时候用computed；每次确实需要重新加载，不需要缓存时用methods。

### 12.如何实现深度监听？

vue中提供了在watch监听时设置deep:true 就可以实现对对象的深度监听，但是直接深度监听某个对象并不合适，因为每个属性变化都会引起watch定义的操作，如果只是监听对象中的某个属性，可以用字符串的形式。

```javascript
watch: {
    todo_list: {
        // watch中要执行的方法
        handler: function(todo_list) {
            todoStorage.post_list(todo_list)
        },
        // 监听的深度
        deep: true
    }
},
// 字符串形式
watch: {
    'too_list.item'(e){
        console.log("${e}")
    }
}
```



### 14.provide/inject实现响应式数据更新的方法

[www.jb51.net/article/172…](https://www.jb51.net/article/172018.htm)

### 15.不同的生命周期过程中，分别可以干点什么？

1. beforeCreate：data，watcher，methods都不存在这个阶段。但是有一个对象存在，那就是$route，因此此阶段就可以根据路由信息进行重定向等操作。
2. created:实例已经创建完成，可以进行数据、资源请求；
3. mounted：实例挂载到了dom上，可以进行一些dom操作；
4. beforeUpdate：可以在钩子中进一步的更新状态，这时的更新不会触发附加的重渲染过程；
5. updated：更新已完成，这时最好不要再进行状态更新，不然可能导致死循环
6. beforeDestroyed：实例销毁前的钩子函数，可以做一些优化操作，比如清理定时器、解除绑定事件、解除监听
7. destroyed：可以销毁一些监听，比如如果开启了总线，则将其销毁。

### 16.ajax请求放在哪个生命周期？

放在created之后的都可以，一般放在created和mounted，前者的时机更早，如果在页面挂载完之前请求完成的话就不会看到闪屏，但无法操作dom，且异步请求很有可能在挂载完成后数据还没拿到；后者可以操作dom，所以有必须依赖dom的情况的话，可以放在mounted的$nextTick里。

### 17.beforeDestroy什么时候使用？

当前页面中使用了$on时，需要在组件销毁前解绑；清除自己定义的定时器；解除事件绑定，比如mousemove、scroll之类的

## 18.vue中的模版编译原理

模板解析阶段：将一堆模板字符串用正则等方式解析成抽象语法树AST； 优化阶段：遍历AST，找出其中的静态节点，并打上标记； 代码生成阶段：将AST转换成渲染函数；

## 19.v-if和v-for为什么不能同时使用？

因为同时使用时，vue的内在逻辑是会先处理循环，然后对循环的每一项做条件判断。如果循环的项非常多，那就会造成非常大的性能消耗。

## 20.简述vue中diff算法原理

[www.cnblogs.com/wind-lanyan…](https://www.cnblogs.com/wind-lanyan/p/9061684.html)

## 21.v-for中为什么要使用key？

diff算法主要是做同级比较，它会同时比较标签名和key，如果设置了key，当子节点位置发生变化时，vue也能很迅速的定位到该节点，无需重新去创建、销毁。一般也不建议使用索引作为key值，比如删除第一项，第二项的索引会变为0，vue做比对时会复用旧的节点。

## 22.描述组件渲染和更新过程

渲染组件时，会通过 Vue.extend方法构建子组件的构造函数，并进行实例化。最终手动调用$mount() 进行挂载。更新组件时会进行 patchVnode 流程.核心就是diff算法。

## 23.vue中事件绑定的原理

原生事件是通过addEventListener实现的；自定义事件是通过$on方法。

## 24.v-model的实现原理以及如何自定义v-model？

可以看成是value和input的语法糖

## 25.v-html会导致什么问题？

会导致xss注入攻击，

## 26. v-if和v-for哪个优先级更高？如果两个同时出现，应该怎么优化得到更好的性能？

**1. v-if和v-show的区别：**
首先v-if和v-show都是用来控制Dom的显示与隐藏；
v-if：是根据后面数据的真假值判断直接从Dom树上删除或创建；
v-show：只是修改元素的css样式，也就是display属性，元素始终都在 Dom树上。
然后又被问及了
display：none与visibility：hidden的区别：
（也都是隐藏元素）
display：none 不占据空间
visibility：hidden 占据空间
**2. vue路由如何传递参数？有什么区别？**
query方式（get传参）：页面跳转的时候，可以在地址栏看到请求参数；
params方式：参数不会在vue地址栏中显示
**3. vue父子组件之间如何传递参数？**
父传子：父组件调用子组件的时候绑定动态属性或方法，在子组件中通过**props**接收；
子传父：通过触发自定义事件传递【this.$emit(‘事件名称’,‘传递的数据’)】
**4. vue导航守卫你知道哪几种？**
全局守卫：beforeEach （全局导航钩子：router.beforeEach(to,from,next)，跳转前进行判断拦截，登录时候会用到）
后置守卫：afterEach
全局解析守卫：beforeResolve
路由独享守卫：beforeEnter
**5. 说一下vue的生命周期**
![img](https://img-blog.csdnimg.cn/20200531135546937.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3NzA0Ng==,size_16,color_FFFFFF,t_70)
**6. 说一下keep-alive作用？**
keep-alive是Vue的内置组件，能在组件切换过程中将状态保留在内存中，防止重复渲染DOM。
使用keep-alive会将数据保留在内存中，如果要在每次进入页面的时候获取最新的数据，需要在**activated**阶段获取数据，承担原来created钩子中获取数据的任务。
**7. 介绍下vuex是用来干什么的？**
vuex是vue的一种状态管理模式。（适用于大型单页应用）用来解决不同组件之间的数据共享。vuex的状态存储是响应式的。 改变（store）状态的方式是（commit）提交mutations，这是个同步的事物； 异步逻辑应该封装在action中。

暂时遇到的就这么些，后续遇到会补充更新。
如有异议欢迎提出，本人定积极改正，不断学习，共同进步。