//2.commonJS导入add，mul
const {add,mul} = require("./mathUtils.js")

console.log(add(10,20))
console.log(mul(10,10))

// 使用es6语法导入default的模块语句
import info from './info.js'

// 使用es6导入指定量
import {age, name} from './info.js'


console.log(info.name)
console.log(info.age)
console.log(name)
console.log(age)
