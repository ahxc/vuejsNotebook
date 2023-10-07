/* 构造器
constructor()方法是类的构造函数，用于传递参数，返回实例对象，
通过new命令生成对象实例时，自动调用该方法，没有显示定义的话，
会自动创建一个constructor() */
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
/* 类的继承 */
class Items extends Goods {
	constructor() {
		super()//继承父属性，如果需要指定继承的属性，和构造器一同写入属性名即可。
	}
	con() {
		console.log(this.title)
	}
}
// 实例化
const G = new Goods('newtitle')
G.con// newtitle

// 继承
class Father {
  constructor(x, y) {
        this.x = x;
        this.y = y;
  }
    sum(){
        consolo.log(this.x+this.y);
    }
}
const zx = new Star();
class Son extends Father{
    constructor(x, y){
        super(x, y);/* 使用super后可以调用父类的构造函数 */
    }
    /* 覆写父类方法 */
    sum() {
        super.sum();
  }
}
var son = new Son(1, 2);/* 父类无法获取1，2 */
son.sum()/* 调用子类sum方法，如果没有查找父类有没有sum方法 */

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