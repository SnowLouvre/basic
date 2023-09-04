/*
 * 给你一个整数数组 coins ，表示不同面额的硬币；以及一个整数 amount ，表示总金额。
 * 计算并返回可以凑成总金额所需的 最少的硬币个数 。如果没有任何一种硬币组合能组成总金额，返回 -1 。
 * 你可以认为每种硬币的数量是无限的。
 */
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  //   const len = coins.length;
  //   const dp = new Array(amount + 1).fill(0);
  //   for (let i = 1; i <= amount; i++) {
  //     for (let j = 0; j < len; j++) {
  //       const count = Math.floor(i / coins[j]);
  //       if (dp[i - count * coins[j]] > -1) {
  //         dp[i] = Math.min(dp[i], dp[i - count * coins[j]] + count);
  //       }
  //     }
  //   }
  //   console.log(dp);
  //   return dp[amount];
  if (!amount) {
    return 0;
  }

  let dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 0; i < coins.length; i++) {
    for (let j = coins[i]; j <= amount; j++) {
      dp[j] = Math.min(dp[j - coins[i]] + 1, dp[j]);
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
};
console.log(coinChange([1, 2, 5], 11)); // 3
console.log(coinChange([2], 3)); // -1
