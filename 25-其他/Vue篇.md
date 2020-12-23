### v-if和v-show区别

 **v-if有更高的切换开销**。v-if是真正的条件渲染，因为它会确保在切换过程中事件监听器和子组件被销毁和重建。

**v-show有更高的初始渲染开销**。v-show无论条件是否复合，没有进行节点的创建，只是改变了display的值，none，不显示且不占据位置。 

**总结**：如果需要频繁切换，v-show更好，运行条件不太可能改变时，则用v-if。

### 如何让css只在当前组件生效

```html
<style scoped>
```

### NextTick

[掘金](https://juejin.cn/post/6844903843197616136)

### Vue响应式原理

[掘金](https://juejin.cn/post/6844903561327820808)

### 为什么vue的data必须是个函数

Object是引用数据类型，如果不用function返回，每个组件的data都是内存的同一个地址，一个数据改变了其他也改变了。

JavaScript**只有函数{}构成作用域**，对象的{}以及if(){}都不构成作用域，data是一个函数时，每个组件实例都有自己的作用域，每个实例相互独立，不会相互影响。

**同一个组件被复用多次，会创建多个实例**。这些实例用的是同一个构造函数，如果 data 是一个对象的话。那么所有组件都共享了同一个对象。为了保证组件的数据独立性，要求每个组件必须通过 data 函数返回一个对象作为组件的状态。

关于这点对于微信小程序的理解：微信小程序不是函数，他是通过setData来改变数据，可能是切断引用链

### 说说对keep-alive的理解

[掘金](https://juejin.cn/post/6844903837770203144)

常规情况下路由每次调用都是重新创建组件，发起新的路由就路由的组件就会被销毁

keep-alive是一个抽象组件：它自身不会渲染一个 DOM 元素，也不会出现在组件链中；使用keep-alive包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。

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

### vue如何检测数组变化

[CSDN](https://blog.csdn.net/XuM222222/article/details/99950241)

1.覆写数组的push、pop、shift、unshift、splice、sort、reverse的方法

2、如果浏览器支持**\_\_proto\_\_属性**，则覆写方法定义在原型上，反之直接覆写

3、如果浏览器支持**\_\_proto\_\_属性**使用push等方法时先从其原型arrayMethods上寻找push方法，不支持则直接从数组本身查找方法，没有就原型上查找。两者都通过响应式原理中ob.dep.notify()通知watcher，更新并render

ob.dep.notify()

### `1为什么vue采用异步渲染

**什么是异步渲染：**

vue是组件级的更新，那么组件涉及的数据可能非常多，如果一改就立刻更新，会非常损耗性能，尤其是在vue2.0以后，vue还会计算通知依赖于更改数据的其他组件，这中间损耗的性能就更为严重了。所以vue采用异步渲染，在本轮数据更新后去更新视图。 [www.sohu.com/a/227583981…](https://www.sohu.com/a/227583981_500651)



### computed、watch和method的区别

method：函数调用，每使用一处，就会执行一次，开销比较大。

computed：属性调用，计算属性是具备缓存的，只有当依赖的data数据发生变化时才会重新计算。computed的由来还有一个重要原因，就是防止文本插值中逻辑过重，导致不易维护。

watch：监听属性的变化，watch更加适用于监听某一个值的变化并做对应的操作，比如请求后台接口等 数据量大。

需要缓存的时候用computed；每次确实需要重新加载，不需要缓存时用methods。

### 如何实现深度监听？

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



### `1provide/inject实现响应式数据更新的方法

[www.jb51.net/article/172…](https://www.jb51.net/article/172018.htm)

### 不同的生命周期过程中，分别可以干点什么？

1. beforeCreate：data，watcher，methods都不存在这个阶段。但是有一个对象存在，那就是$route，因此此阶段就可以根据路由信息进行重定向等操作。
2. created:实例已经创建完成，可以进行数据、资源请求；
3. mounted：实例挂载到了dom上，可以进行一些dom操作；
4. beforeUpdate：可以在钩子中进一步的更新状态，这时的更新不会触发附加的重渲染过程；
5. updated：更新已完成，这时最好不要再进行状态更新，不然可能导致死循环
6. beforeDestroyed：实例销毁前的钩子函数，可以做一些优化操作，比如清理定时器、解除绑定事件、解除监听
7. destroyed：可以销毁一些监听，比如如果开启了总线，则将其销毁。

### ajax请求放在哪个生命周期？

放在created之后的都可以，一般放在created和mounted，前者的时机更早，如果在页面挂载完之前请求完成的话就不会看到闪屏，但无法操作dom，且异步请求很有可能在挂载完成后数据还没拿到；后者可以操作dom，所以有必须依赖dom的情况的话，可以放在mounted的$nextTick里。

### beforeDestroy什么时候使用？

当前页面中使用了$on时，需要在组件销毁前解绑；清除自己定义的定时器；解除事件绑定，比如mousemove、scroll之类的。

### vue中的模版编译原理

模板编译分runtime和runonly

无论哪种，template最终会被渲染为render函数，记住这个结论。

**runtime-only：**
render --> vDom(虚拟Dom) --> 真实的Dom --> 页面

runonly将template在打包的时候，就已经编译为render函数，代码体积更轻运行速度更快。但模板文件只允许在.vue里，或者说只能作为vue实例导入。

```
new Vue({
  el: '#app',
  // template在打包时就编译成render
  render: h => h(App)
  // 方法1.h函数可比作：createdElemnet("标签", {标签的属性：值,}, ["dom"])
})
```

**runtime-compiler：**
template --> ast(抽象语法树) --> render --> vDom(虚拟Dom) --> 真实的Dom --> 页面

模板解析阶段：将一堆模板字符串用正则等方式解析成抽象语法树AST； 优化阶段：遍历AST，找出其中的静态节点，并打上标记； 代码生成阶段：将AST转换成渲染函数render；

```javascript
new Vue({
  el: '#app',
  components: { App },
  // 组件里使用template的都是runtime-compiler模式
  template: '<App/>'// 节点没有元素时可以只写尾部</>
  // 方法2.直接传入一个组件
})
```



### 简述vue中diff算法原理

[掘金](https://juejin.cn/post/6844903923183157261)

### v-for中为什么要使用key

diff算法主要是做同级比较，它会比较标签名和key，如果设置了key，当子节点位置发生变化时，vue也能很迅速的定位到该节点，无需重新去创建、销毁，同时在渲染是也能记住相对位置。一般也不建议使用索引作为key值，比如删除第一项，第二项的索引会变为0，vue做比对时会复用旧的节点。

### 描述组件渲染和更新过程

渲染组件时，会通过 Vue.extend方法构建子组件的构造函数，并进行实例化。最终手动调用$mount() 进行挂载。更新组件时会进行 patchVnode 流程，核心就是diff算法。

### vue中事件绑定的原理

原生事件是通过addEventListener实现的；自定义事件是通过$on方法。

### v-model的实现原理以及如何自定义v-model？

v-model实质可看作v-on和v-bind的语法糖

```html
<!-- 实现双向绑定 @input监听输入框事件  -->
<input type="text" :value="message" @input="valueChange" >
<!-- js中$event获取事件对象，$event.target.value获取input值，微信小程序 -->
```

### v-html会导致什么问题？

1. 作为普通的html插入，不会被vue模板编译，只能独立渲染，不能使用一些模板语法。
2. 设置了scoped样式只影响到组件内部，scoped样式不会影响到v-html内部，如果需要修改则需要一个针对这个局部的一个全局样式：深度选择器一个可穿透scoped的选择器。
3. 会导致xss注入攻击，一种修改html插入的攻击。

深度选择器：

```CSS
.a >>> .b{...}</style>//遇到less sass可能会失效
/* 最终编译，穿透结果直接选择了这个data-v属性 */
.a[data-v-f3f3eg9] .b{/* ... */}
/* 所以用/deep/代替 */
.a{/deep/ .b{...}}
```

### vue路由如何传递参数？有什么区别？

query方式（get传参）：页面跳转的时候，可以在地址栏看到请求参数；两者皆可调用
params方式：参数不会在vue地址栏中显示，同时params不能通过path路径的方式调用，即当前路由不应该是path方式获取，而是用路由名字，name

[掘金，重点](https://juejin.cn/post/6844903519732891662)

### vue导航守卫

[掘金](https://juejin.cn/post/6844903926471327757)

导航：“导航”表示路由的跳转。

真实的项目中需要判断权限或者登录状态决定用户能访问的路由，但是因为路由是在浏览器地址栏中的，用户可以输入，如果不加以**拦截**就可以看到本不该看到的页面；为了避免这种情况，我们需要使用导航守卫，在路由发生变化时作出相应的判断，判断用户是否可以去到他想去往的页面的路由。

**全局守卫：**beforeEach，全局配置导航钩子：router.beforeEach(to,from,next){};，用于监听所有即将跳转的路由，做一些检查贴标过滤等操作，比如title。

1. to 路由对象，即将进入的页面的路由信息。
2. from 路由对象，当前正要离开页面路由信息。
3. next 函数，交出控制权或者中断导航。

**后置守卫：**afterEach，不需要调用next()，和beforeEach相反，路由结束后执行，其他一样。
**全局解析守卫：**beforeResolve，也是全局守卫，和beforeEach类似，区别是在导航被确认之前，**同时在所有组件内守卫和异步路由组件被解析之后**，解析守卫就被调用。
**路由独享守卫：**beforeEnter，在路由js中单独配置，和beforeEach一样，只是独享。

**组件内守卫：**beforeRouteUpdate，beforeRouteEnter，BeforeRouteLeave。组件内定义。

### MVP，MVC，MVVM

[MVC和MVT](https://www.jianshu.com/p/d5dc2c82f5cf)

[MVC，MVP，MVVM](https://www.jianshu.com/p/8e3d4ab80714)

### vue优化

[掘金](https://juejin.cn/post/6844903913410314247)

<hr>

### Vue响应式原理简单总结

**1.initData**

先对data是否是函数的判断，如果是函数就调用`getData`方法，不是函数就直接获取，或则空对象。然后通过遍历使用`object.defineProperty`将`_data` 都代理到 `vm` （vue实例）上；然后对data调用observe；

**2.observe**

首先会把observer实例绑定到data上面取名\_\_ob\_\_属性。在observe开始时，先会对数据类型进行一次判断，如果是数组，调用另一套针对数组的`observeArray`方法，`observeArray`主要为了更深度监听数组元素的变化，会对浏览器进行判断，如果浏览器支持隐式原型`proto`，那么直接定义一套基于原型的数组方法。如果不支持，那么就直接覆写数组方法。方法中都加入了setter中的notify

如果不是数组，则直接调用`walk`方法，遍历每个属性执行`defineReactive`函数。

`defineReactive`函数首先实例化一个Dep对象，然后判断对象是否已经定义过计算属性。定义过则直接通过call回调，没有则定义为any（任意类型）。然后又通过object.defineproperty定义关键的getter和setter方法。定义getter方法时一个核心函数`dep.depend()`，setter方法`dep.notify()`；

**3.Dep**

首先Dep会通过Dep.target判断是否收集依赖，还是普通的取值。通过depend收集依赖，即针对数据的各种watcher，加入到自身属性subs中。通过notify发布通知。调用watcher自身的update方法。Dep和watcher关系紧密，他只是调度作用，具体对数据的操作还在watcher中。

**注意**：Dep.target 是全局唯一的观察者，因为在任何时候只有一个观察者被处理。 默认为空null，待处理的观察者队列 const targetStack = [];

**4.watcher**

watcher定义了很多原型方法，实例化时会触发get()方法

1. 通过get方法将watcher本身加入观察者队列，然后调用getter方法进行视图渲染，还可以通过重要参数deep来判断是否监听至对象的属性变化。
2. 通过update方法进行回调，加入观察者队列。

**注意**：vue3则是把object.defineProperty替换为了es6的proxy。

### v-if和v-for为什么不能同时使用？如何优化

比如：

```html
<li v-for="item in list" v-if="item.age<30">
```

1. 当 Vue 处理指令时，v-for 比 v-if 具有更高的优先级
2. 哪怕我们只渲染出**条件满足**一小部分用户的元素，也得在每次重渲染的时候遍历整个列表，不管条件如何变化。

这会造成性能浪费。

如何优化：我所做的处理，v-for是用来遍历一个data，在这个data递交给v-for时，先做好筛选。

### vue通信

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