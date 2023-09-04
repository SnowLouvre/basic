/*
 * 给你一个整数数组 nums ，请你找出数组中乘积最大的非空连续子数组（该子数组中至少包含一个数字），并返回该子数组所对应的乘积。
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
  // const len = nums.length
  // const dp = new Array(len).fill(0).map(item => new Array(2).fill())

  // dp[0][0] = nums[0]
  // dp[0][1] = nums[0]
  // let result = nums[0]

  // for (let i = 1; i < len; i++) {
  //     dp[i][0] = Math.max(dp[i - 1][0] * nums[i], nums[i], dp[i - 1][1] * nums[i])
  //     dp[i][1] = Math.min(dp[i - 1][0] * nums[i], nums[i], dp[i - 1][1] * nums[i])
  //     result = Math.max(dp[i][0], result)
  // }
  // return result
  // 不需要二维dp数组存数据
  let res = nums[0];
  let prevMin = nums[0];
  let prevMax = nums[0];
  let temp1 = 0,
    temp2 = 0;
  for (let i = 1; i < nums.length; i++) {
    temp1 = prevMin * nums[i];
    temp2 = prevMax * nums[i];
    prevMin = Math.min(temp1, temp2, nums[i]);
    prevMax = Math.max(temp1, temp2, nums[i]);
    res = Math.max(prevMax, res);
  }
  return res;
};
console.log(maxProduct([2, 3, -2, 4])); // 6
