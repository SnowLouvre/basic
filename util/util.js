// 阶乘 O(n!)
function factorial(num) {
    // if (num <= 1) {
    //   return 1;
    // } else {
    //   return num * factorial(num - 1);
    // }
    const dp = new Array(num).fill(0)
    dp[0] = 1
    for (let i = 1; i < num; i++) {
        dp[i] = dp[i - 1] * num
    }
    return dp[num - 1]
  }

//  Math.pow(2, n) O(2^n)：指数复杂度