// 1.如何理解Vue生命周期
// 13章节

// 2.如何进行非父子组件通信
// 11章节总线，19章节vuex中store

// 3.Vue响应式原理
// 什么是响应式：
// 当一个状态改变之后，与这个状态相关的事务也立即随之改变，
// 包括数据状态改变引起的dom元素的改变或一些方法的启用。
// 数据模型是普通的JavaScript对象。当修改它们时，视图会进行更新。
// vue是基于defineProperty来实现数据响应的
// 定义对象obj的新属性或者修改
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
