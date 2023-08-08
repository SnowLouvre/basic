// const urls = ["url1", "url2", "...", "url100"];
// const maxConcurrentNum = 10; // 最大并发数
// // 数组分块，chunk表示每批次数量，返回数组二维数组
// function chunk(arr, chunk) {
//   let result = [];
//   for (let i = 0, len = arr.length; i < len; i += chunk) {
//     result.push(arr.slice(i, i + chunk));
//   }
//   return result;
// }

// // 异步请求方法
// function fetchUrl(url) {
//   return new Promise((resolve, reject) => {
//     fetch(url)
//       .then((res) => resolve(res))
//       .catch((err) => reject(err));
//   });
// }

// // 对url数组进行分块处理
// const chunkedUrls = chunk(urls, maxConcurrentNum);

// (async function () {
//   try {
//     for (let urls of chunkedUrls) {
//       const promises = urls.map((url) => fetchUrl(url));
//       // 等待所有promises完成执行，并将结果存入results数组中
//       const results = await Promise.all(promises);
//       console.log("results:", results);
//     }
//   } catch (err) {
//     console.error(err);
//   }
// })();

// 模仿一个fetch的异步函数，返回promise
function mockFetch(param) {
  console.log(param, "param");
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(param);
    }, param * 1000);
  });
}

function limitedRequest(urls, maxNum) {
  const pool = [];
  const result = [];
  // 处理maxNum比urls.length 还要大的情况。
  const initSize = Math.min(urls.length, maxNum);
  for (let i = 0; i < initSize; i++) {
    // 一次性放入初始的个数
    pool.push(run(urls.splice(0, 1)));
  }
  // r 代表promise完成的resolve回调函数
  // r 函数无论什么样的结果都返回promise，来确保最终promise.all可以正确执行
  function resolve(value) {
    console.log(
      "当前并发度：",
      pool.length,
      urls
    );
    result.push(value)
    if (urls.length === 0) {
      return Promise.resolve(value);
    }
    return run(urls.splice(0, 1));
  }
  // 调用一次请求
  function run(url) {
    return mockFetch(url).then(resolve);
  }
  // 全部请求完成的回调
  Promise.all(pool).then((value) => {
    console.log(value, "value", result);
    console.log("请求已经全部结束");
  });
}
// 函数调用
limitedRequest([2, 2, 6, 5, 4, 3, 2, 1], 3);

// 最终返回结果
// node .\src\views\doc\detail\index.js
// 当前并发度： 3
// 当前并发度： 3
// 当前并发度： 3
// 当前并发度： 3
// 当前并发度： 3
// 当前并发度： 3
// 并发请求已经全部发起
//当前并发度： 3
//并发请求已经全部发起
//当前并发度： 3
//并发请求已经全部发起
//请求已经全部结束
