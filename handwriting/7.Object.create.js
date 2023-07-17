Object.myCreate = function (proto, defineProperties) {
  if (typeof proto !== "object" && typeof proto !== "function") {
    throw new TypeError(
      `Object prototype may only be an Object or null: ${proto}`
    );
  }
  if (defineProperties === null) {
    throw new TypeError("Cannot convert undefined or null to object");
  }
  // 定义新对象
  const obj = {};
  // 设置原型
  // obj.__proto__ = proto // 不建议这么做了
  // 通常，应该使用 Object.setPrototypeOf() 方法来设置对象的原型。
  // 因为 Object.prototype.__proto__ 访问器已被弃用。
  Object.setPrototypeOf(obj, proto); // 建议使用setPrototypeOf设置原型
  if (defineProperties !== undefined) {
    Object.defineProperties(obj, defineProperties);
  }
  return obj;
};
let obj1 = { b: 2 };
let obj2 = Object.myCreate(obj1, { a: { enumerable: false } });
console.log(obj2); //{}
let obj2_ = Object.myCreate(obj1, { a: { enumerable: true } });
console.log(obj2_); //{ a: undefined }
// let obj3 = Object.create("222", undefined); // TypeError: Object prototype may only be an Object or null: 222
// let obj4 = Object.create(obj1, null); // TypeError: Cannot convert undefined or null to object
console.log(obj2.a); // undefined

function Parent() {
  this.name = "parent";
}
Parent.prototype.eat = function () {
  console.log("eat");
};
function Child() {
  this.age = 9;
  Parent.call(this);
}
Child.prototype = Object.myCreate(Parent.prototype, {
  constructor: { value: Child },
});
// { constructor: { value: Child } }  这段代码保证 Child 的 prototype 的 constructor 还指向 Child 的构造函数
let child = new Child();
console.log(child.constructor, "constructor"); // [Function: Child] 'constructor'
child.eat(); // eat
