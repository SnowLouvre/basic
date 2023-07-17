Function.prototype.myCall = function (context, ...args) {
  if (typeof this !== "function") {
    throw new TypeError("not a function");
  }
  context = context || window;
  const fn = Symbol("fn");
  context[fn] = this;
  const result = context[fn](...args);
  delete context[fn];
  return result;
};

Function.prototype.myApply = function (context, args) {
  if (typeof this !== "function") {
    throw new TypeError("not a function");
  }
  context = context || window;
  const fn = Symbol("fn");
  context[fn] = this;
  const result = context[fn](...args);
  delete context[fn];
  return result;
};

Function.prototype.myBind = function (context, ...args) {
  if (typeof this !== "function") {
    throw new TypeError("not a function");
  }
  let fn = Symbol("fn");
  fn = this;
  return function (...newArgs) {
    return fn.myApply(context, [...args, ...newArgs]);
  };
};
function greeting() {
  return `${this.name} 说：${Array.prototype.slice.apply(arguments).join(" ")}`;
}
const alice = { name: "Alice" };
const bob = { name: "Bob" };
// 使用 call
console.log(greeting.myCall(bob, "Hello", "世界")); // Bob 说：Hello 世界
// 使用 bind
const greetingFromAlice = greeting.myBind(alice, "你好");
console.log(greetingFromAlice("朋友们")); // Alice 说：你好 朋友们
// 使用 apply
console.log(greeting.myApply(alice, ["Hi", "大家好"])); // Alice 说：Hi 大家好

Function.prototype.myNew = function (fn, ...args) {
  const obj = Object.create(fn.prototype);
  fn.apply(obj, ...args);
  const result = fn.apply(obj, args);
  if (typeof result === "object" && result !== null) {
    return result;
  }
  return obj;
};
