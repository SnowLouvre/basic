/*
 * 给你一个 只包含正整数 的 非空 数组 nums 。请你判断是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。
 * 输入：nums = [1,5,11,5]
 * 输出：true
 * 解释：数组可以分割成 [1, 5, 5] 和 [11] 。
 */
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
  const sum = nums.reduce((a, b) => {
    return a + b;
  }, 0);
  if (sum % 2 !== 0) {
    return false;
  }
  const len = sum / 2;
  const dp = new Array(len + 1).fill(false);
  dp[0] = true;
  for (let num of nums) {
    for (let i = dp.length - 1; i >= num; i--) {
      dp[i] = dp[i] || dp[i - num];
    }
  }

  return dp[Math.floor(sum / 2)];
};
console.log(canPartition([1,5,11,5])) // true
