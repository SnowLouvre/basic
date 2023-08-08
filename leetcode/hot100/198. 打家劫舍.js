/*
 * 你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。
 * 给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。
*/
/**
 * @param {number[]} nums
 * @return {number}
 */
// 动态规划
var rob = function (nums) {
  // const len = nums.length
  // const dp = new Array(len).fill().map(item => new Array(2).fill(0))
  // dp[0][0] = 0;
  // dp[0][1] = nums[0]
  // if (len < 2) {
  //   return Math.max(dp[len - 1][0], dp[len - 1][1])
  // }
  // dp[1][0] = nums[0] // Math.max(dp[0][0], dp[0][1])
  // dp[1][1] = nums[1]
  // for (let i = 2; i < len; i++) {
  //   dp[i][0] = Math.max(dp[i - 1][1], dp[i - 2][1])
  //   dp[i][1] = Math.max(dp[i - 1][0] + nums[i], dp[i - 2][1] + nums[i])
  // }
  // return Math.max(dp[len - 1][0], dp[len - 1][1])
  // 不用二维dp
  const len = nums.length;
  if (len == 0)
    return 0;
  const dp = new Array(len + 1);
  dp[0] = 0;
  dp[1] = nums[0];
  for (let i = 2; i <= len; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i - 1]);
  }
  return dp[len];
};
console.log(rob([1, 2, 3, 1])) // 4
console.log(rob([2, 7, 9, 3, 1])) // 12