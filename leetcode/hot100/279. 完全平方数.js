/*
 * 给你一个整数 n ，返回 和为 n 的完全平方数的最少数量 。
 * 完全平方数 是一个整数，其值等于另一个整数的平方；换句话说，其值等于一个整数自乘的积。例如，1、4、9 和 16 都是完全平方数，而 3 和 11 不是。
*/
/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function (n) {
  const dp = new Array(n + 1).fill(0)
  // dp[2] = 2
  // dp[3] = 3
  // dp[4] = 1
  // dp[5] = 2
  // dp[6] = 3 // 4+1+1
  // dp[7] = 4 // 4+1+1+1
  // dp[8] = 2 // 4+4
  // dp[9] = 1 // 9
  // Math.sqrt(10)
  for (let i = 1; i <= n; i++) {
    // const sqrt = Math.floor(Math.sqrt(i))
    // dp[i] = dp[i - sqrt * sqrt] + 1
    dp[i] = i; // 最坏的情况就是每次+1
    for (let j = 1; i - j * j >= 0; j++) {  // 在轮训一次 注意dp[i] = dp[i - sqrt * sqrt] + 1和dp[i] = Math.min(dp[i], dp[i - j * j] + 1)的区别
      console.log('dp[i - j * j]', dp[i - j * j], i, j, i - j * j, 'dp[i]', dp[i], Math.min(dp[i], dp[i - j * j] + 1))
      dp[i] = Math.min(dp[i], dp[i - j * j] + 1); // 动态转移方程
    }
  }
  // console.log(dp)
  return dp[n]
};
// console.log(numSquares(12)) // 3 4+4+4 dp(12) = dp(8) + 1 = 2 + 1 = 3
console.log(numSquares(13)) // 2 4+9