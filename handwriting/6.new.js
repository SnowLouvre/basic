// 自定义new操作符函数：模拟实现new操作符的功能
function myNew(constructorFn, ...args) {
  // 创建一个空对象，在内存中创建对应地址
  // 并将其原型设置为构造函数的原型
  const obj = Object.create(constructorFn.prototype);
  // 调用构造函数，并将this绑定到新创建的对象上
  const result = constructorFn.apply(obj, args);
  // 如果构造函数返回一个对象，则返回该对象；否则返回新创建的对象
  if (typeof result === "object" && result !== null) {
    return result;
  }
  return obj;
}
// new Object()继承内置对象Object，而Object.create()则是继承指定对象
// 可以通过Object.create(null) 创建一个干净的对象，也就是没有原型，而 new Object()创建的对象是 Object的实例，原型永远指向Object.prototype

// 示例构造函数
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.sayHello = function () {
  console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`);
};
// 使用示例
const john = myNew(Person, "John", 25);
john.sayHello(); // Output: Hello, my name is John and I'm 25 years old.
