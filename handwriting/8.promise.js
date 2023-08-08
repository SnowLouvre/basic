// 自定义Promise类：模拟实现Promise的基本功能
class MyPromise {
  constructor(executor) {
    // Promise的三个状态：pending、fulfilled、rejected
    this.state = "pending";
    this.value = undefined;
    this.reason = undefined;

    // 用于存储异步操作的回调函数
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    // 执行executor函数
    try {
      console.log(1);
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }
  // 解决Promise（状态变为fulfilled）
  resolve(value) {
    console.log(this.state, "resolve");
    if (this.state === "pending") {
      this.state = "fulfilled";
      this.value = value;
      // 执行所有已注册的fulfilled回调函数
      this.onFulfilledCallbacks.forEach((callback) => callback(this.value));
    }
  }
  // 拒绝Promise（状态变为rejected）
  reject(reason) {
    if (this.state === "pending") {
      this.state = "rejected";
      this.reason = reason;
      // 执行所有已注册的rejected回调函数
      this.onRejectedCallbacks.forEach((callback) => callback(this.reason));
    }
  }
  // 注册Promise的回调函数
  then(onFulfilled, onRejected) {
    console.log(this.state, "then");
    if (this.state === "fulfilled") {
      onFulfilled(this.value);
    } else if (this.state === "rejected") {
      onRejected(this.reason);
    } else if (this.state === "pending") {
      // 异步操作时，将回调函数存储起来，待异步操作完成后执行
      this.onFulfilledCallbacks.push(onFulfilled);
      this.onRejectedCallbacks.push(onRejected);
    }
    // 返回新的Promise对象，实现链式调用
    return this;
  }
}

function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = []; // 用于保存每个Promise的结果
    let completedPromises = 0; // 已经完成的Promise数量

    // 遍历传入的Promise数组
    for (let i = 0; i < promises.length; i++) {
      // 对每个Promise进行处理
      promises[i]
        .then((result) => {
          // 如果Promise成功解决，则将结果保存在相应的位置
          results[i] = result;
          completedPromises++;
          // 当所有Promise都完成时，返回结果
          if (completedPromises === promises.length) {
            resolve(results);
          }
        })
        .catch((error) => {
          // 如果有一个Promise被拒绝，则立即返回拒绝的结果
          reject(error);
        });
    }
    // 处理空Promise数组的情况
    if (promises.length === 0) {
      resolve(results);
    }
  });
}
function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    // 遍历传入的Promise数组
    for (const promise of promises) {
      // 对每个Promise进行处理
      promise
        .then((result) => {
          // 如果有一个Promise解决，则使用resolve解决新的Promise
          resolve(result);
        })
        .catch((error) => {
          // 如果有一个Promise被拒绝，则使用reject拒绝新的Promise
          reject(error);
        });
    }
  });
}

function promiseAllSettled(promises) {
  const settledPromises = [];
  // 遍历传入的 Promise 数组
  for (const promise of promises) {
    // 对每个 Promise 进行处理
    settledPromises.push(
      Promise.resolve(promise)
        .then((value) => ({
          status: "fulfilled",
          value: value,
        }))
        .catch((reason) => ({
          status: "rejected",
          reason: reason,
        }))
    );
  }

  return Promise.all(settledPromises);
}

// 使用示例
const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("Hello, Promise!");
  }, 2000);
});

promise.then((value) => {
  console.log(value); // Output: Hello, Promise!
});
