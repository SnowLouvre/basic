// 手写实现 call
Function.prototype.myCall = function (context, ...args) {
    // 检查调用 myCall 方法的 this 是否为函数
    if (typeof this !== "function") {
      throw new TypeError("not a function");
    }
    // 如果没有传入上下文对象，则默认为全局对象。
    context = context || window;
    // 定义一个唯一的 Symbol 属性名，避免与上下文对象中原有的属性名冲突
    const fn = Symbol("fn");
    // 将当前函数保存到上下文对象的 fn 属性中
    context[fn] = this;
    // 使用展开语法将 args 的元素作为参数，调用保存在上下文对象中的函数
    const result = context[fn](...args);
    // 删除上下文对象中保存的函数属性
    delete context[fn];
    // 返回函数调用的结果
    return result;
  };
  // 手写实现 bind
  Function.prototype.myBind = function (context, ...args) {
    if (typeof this !== "function") {
      throw new TypeError("not a function");
    }
    //   const self = this;
    //   return function F(...newArgs) {
    //     if (this instanceof F) {
    //       return new self(...args, ...newArgs);
    //     }
    //     return self.apply(context, args.concat(newArgs));
    //   };
    let fn = Symbol("fn");
    fn = this;
    return function Fn() {
      // 这里arguments的作用是拿到Fn中传入的参数
      return fn.apply(context, args.concat(arguments));
    };
  };
  // 手写实现 apply
  Function.prototype.myApply = function (context, args) {
    // 检查调用 myApply 方法的 this 是否为函数
    if (typeof this !== "function") {
      throw new TypeError("not a function");
    }
    // 如果没有传入上下文对象，则默认为全局对象。
    context = context || window;
    // 定义一个唯一的 Symbol 属性名，避免与上下文对象中原有的属性名冲突
    const fn = Symbol("fn");
    // 将当前函数保存到上下文对象的 fn 属性中
    context[fn] = this;
    // 使用展开语法将 args 数组的元素作为参数，调用保存在上下文对象中的函数
    const result = context[fn](...args);
    // 删除上下文对象中保存的函数属性
    delete context[fn];
    // 返回函数调用的结果
    return result;
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
  