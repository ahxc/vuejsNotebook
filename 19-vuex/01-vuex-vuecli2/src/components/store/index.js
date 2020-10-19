import Vue from "vue"
import Vuex from "vuex"

// 使用vuex步骤和路由相似，1.安装插件
Vue.use(Vuex)

// 模块化的store除了state调用特殊：$store.state.modulesName.stateName，
// 其余无区分都是直接调用$store.getters.name，因此需要注意重名，一个App也最好只用一个store
const moduleA = {
  state: {
    name: "store模块A"
  },
  mutations: {
    modulesMutations(state, payload) {
      state.name = payload
    }
  },
  getters: {
    moduleAGetters(state) {
      return state.name+"_模块getters测试"
    },
    // 模块之间的getters也可以互相调用
    moduleAGettersplus(state, getters) {
      return state.name+"_模块getters测试"+String(getters.mulcomputed)
    }
  },
  actions: {
    moduleAactions(context) {
      setTimeout(() => {
        context.commit("updateinfo");
      }, 1000)
    }
  }
}
// 2.创建store对象，store是响应式的
const store = new Vuex.Store({
  // 一、类似data
  state: {
    counter: 1000,
    students: [
      {id: 1, name: "x", age: 11},
      {id: 2, name: "y", age: 22},
      {id: 3, name: "z", age: 33}
    ],
    info: {
      name: "zyx",
      age: 18,
      height: 1.80
    }
  },
  // 二、类似methods，包括两个属性事件类型和回调函数
  // vuex要求mutaitons必须是同步方法，主要因为store是响应式的，同时浏览器的devtools会有操作快照，
  // 异步操作会导致响应的结果与快照不一致，因此不要在mutation中进行异步操作
  // store的规范化写法可已将所有方法单独放在一个js文件中，这样即可以防止重名目录结构也更清晰
  // import mutations from "..."，其他getters，actions，modules亦可，但state一般不抽离
  mutations: {
    // 事件类型
    increment(state) {
      // 回调函数，参数state
      state.counter++
    },
    decrement(state) {
      state.counter--
    },
    // n是payload
    addnumber(state, n) {
      return state.counter += n
    },
    // action异步的处理步骤3.mutation方法调用事件类型完成操作
    updateinfo(state) {
      state.info.name = "xyz"
    }
  },
  // 三、异步的method，但还是要调用mutations处理state
  // 异步操作要写在action中，但不能直接使用action更改state，还是要通过mutation(官方图19-03)
  actions: {
    // context上下文，action传入的参数，store对象
    // action异步的处理步骤2.action使用commit调用mutation方法
    updateinfoAction(context, payload) {
      setTimeout(() => {
        // 在store内引用mutation也是commit方法，只需记住mutation是最终的state修改方法
        context.commit("updateinfo")
        console.log(payload)
      }, 1000);
    },
    // 模拟完整的异步网络请求
    asynchronization(context, payload) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          context.commit("updateinfo");
          resolve(payload)
        }, 1000)
      })
    }
  },
  // 四、类似computed
  getters: {
    mulcomputed(state) {
      return state.counter * state.counter
    },
    // getters之间可以互相调用
    more20stu(state, getters) {
      console.log(getters.mulcomputed)
      return state.students.filter(s => s.age>=20)
    },
    // store不能直接接收参数建立一个函数返回接收
    moreagestu(state) {
      /* return function(age) {
        return state.students.filter(s => s.age > age) */
      /* 阅读性改良 */
      return (age) => {
        return state.students.filter(s => s.age >= age)
      }
    },
  },
  // 五、一个从store中抽离的store
  modules: {
    moduleA
  }
})

// 3.导出store使用
export default store

/* 对象的结构 */
const onj = {
  name: "xyz",
  age: 18,
  height: 1.80
}

// 将对象结构为多种方法名，list也可以结构，但相对解构list下标和遍历更常用合理
const {name, age, height} = obj
// const {...} = context