function curry(fn) {
  // 定义内部函数用于递归调用
  function curried(...args) {
    // 如果传入的参数数量大于或等于原始函数的参数数量，则直接调用原始函数
    if (args.length >= fn.length) {
      //   return fn(...args);
      return fn.apply(null, args);
    } else {
      // 如果参数数量不足，则返回一个新的函数，继续等待接收剩余的参数
      return function (...moreArgs) {
        // return curried(...args, ...moreArgs);
        return curried.apply(null, [...args, ...moreArgs]);
      };
    }
  }
  return curried; // 返回柯里化后的函数
}

const multiply = (...arg) => {
  return arg.reduce((pre, cur) => {
    return pre * cur;
  }, 1);
};
const curryMul = curry(multiply);
const result = curryMul(1, 2, 3, 4); // 1*2*3 = 6
console.log("result", result);
