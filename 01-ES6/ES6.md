一阶段：html标签、html5新增标签、css样式、css3样式、媒体查询等

二阶段：JavaScript、jQuery、ajax、面向对象、http传输协议等

三阶段：canvas、js高级应用、JS-SDK、H5新增技术

四阶段：node.js、vue.js

### 面向过程POP（process-oriented programming）

面向过程就是分析出解决问题所需要的步骤，然后按步骤解决问题。

**优点**：面向过程性能更好，适合更底层的硬件开发，如单片机。

### 面向对象OOP（object oriented programming）

面向对象是把事务分解成一个个对象，然后对象之间进行分工合作。

**优点**：面向对象编码更灵活，复用程度高，可封装继承多态等，更容易维护和开发。**面向对象特性**：

封装性，继承性，多态性。

### 块级作用域的使用

**let**：1.不存在变量提升，即变量必须先声明在使用。2.暂时性死区，在块级作用域声明的变量必须先声明再使用，因此如果有重名的var变量在let变量前面使用，则报错。

**const**：1.具有块级作用域。2.即值（内存地址）无法修改，但可以修改值得属性。3.必须赋初始值。

### var，let，const区别

var是函数级作用域，作用域在所在的函数内，存在变量提升。

let和const是块级作用域，不存在变量提升。

const的值不可修改。

注意：在ES6中，优先使用const，只有在要更改值时使用let

### 解构赋值

数组：`let [a, b, c] = [1, 2, 3];`

对象：`let {z, x} = {z: "1", x: "2"}; let {z:Z, x:X} = {z: "1", x: "2"}`

`注意：大写的是别名`

### 箭头函数

1.箭头函数的执行结果就是返回值。2.箭头函数不绑定this，箭头函数中的this指向定义函数定义位置的上下文。

`() => {}`

`注意上下文this的指向是可以变化的，定义在对象里的this无法指向对象（对象内部没有作用域），外部另说。函数本身都是通过对象来调用，最终对象window，实例化后this就指向实例，其他遵照第一法则：指向运行时所在的环境`

### 剩余参数和扩展运算符

`...args`表示接收所有的剩余形参，...表示展开一个对象或数组。对象只能是解构赋值，而数组可以展开去除最外层。

```javascript
let [z1, ...z2] = [1,2,3,4], x = [1,2,3,4];
...x;
let z = [...z1, ...z2];
x.push(...z);
```

### Array的扩展方法

```javascript
// from方法
let z = ['0': 'a', '1': 'b', '2': 'c', length: 3];
let x = Array.from(z, (item)=>{});// ['a', 'b', 'c']，接收一个item的处理函数

// find方法
// 传入一个测试条件，查找第一个返回true的位置后续不再执行，然后返回该元素的值，没有符合的则返回undefined
array.find((currentValue, index, arr)=>{}, thisValue)

// findIndex方法
// 与find不同的是，返回索引，没有返回-1
array.findIndex((currentValue, index, arr)=>{}, thisValue)

// includes()
// 表示数组是否含有某值，返回true或false，可以是字符串
array.includes(searchvalue, start)
```

### String的扩展方法

1.``反引号模板字符串，dom模板。写入模板变量${}。

2.startsWith(s)：表示字符串是否以s子串开始，Boolean。

3.endsWith(s): 表示参数是否以s子串结束。

4.s.repeat(n)方法表示将字符串重复n次，返回一个新串。

### set和map

javascript笔记32章节。

### generator

javascript笔记33章节。

### 增强写法

1.for语句

`for(let i of x) {}`

```javascript
for (x in obj){}// 便利对象属性名
```



2.字面量

a.把字面量省略，变量在对象外部声明，在内部直接调用变量。

b.`const b = {__proto__:obj}`：原型的对象构建方式。

### 对象合并

```javascript
Object.assign(obj1, obj2, obj3)
```

### 修饰符decorator

```javascript
function d (params) {
	params.newthis = true
}

@d
class Obj {}
console.log(Obj.newthis)//true
```

