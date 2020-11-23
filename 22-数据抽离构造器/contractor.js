/* 数据构造器，当请求的单例数据过于庞杂，通过数据构造器整合单个组件的数据 */
/* 如商品信息 */
/* 类似python类的init */

/* java类又称class继承 */
export class Goods {
  /* dataresult的字段 */
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
    this.nowPrice = itemInfo.highNowPrice;
  }
}
// 实例化
const item = new Goods('...')


/* 第二种函数构建对象方式
弊端，分不清类型，用的不多 */
export function createPerson(name, age, gender) {
  const obj = new Object();
  obj.name = name
  obj.age = age
  obj.gender = gender
  return obj
}

const item = createPerson('...')

/* 第三种，构造函数构造对象，不使用构造器和类
使用同一个构造函数创建的对象为一类 */
export function Person(name, age, gender){
  this.name = name;
  this.age = age;
  this.gender = gender;
}

const per = new Person('...')

/* 检查一个对象是否为了一个类的实例3
object是大类，因此任何对象都是true */
per instanceof Object
per instanceof createPerson/*false*/