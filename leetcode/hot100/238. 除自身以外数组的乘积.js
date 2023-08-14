/*
 * 给你一个整数数组 nums，返回 数组 answer ，其中 answer[i] 等于 nums 中除 nums[i] 之外其余各元素的乘积 。
 * 题目数据 保证 数组 nums之中任意元素的全部前缀元素和后缀的乘积都在  32 位 整数范围内。
 * 请不要使用除法，且在 O(n) 时间复杂度内完成此题。
*/
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
  // const len = nums.length;
  // const result = []
  // let left = 1
  // for (let i = 0; i < len; i++) {
  //   if (i > 0) {
  //     left = left * nums[i - 1]
  //   }
  //   result[i] = left
  // }
  // const resultRight = []
  // let right = 1
  // for (let j = len - 1; j >= 0; j--) {
  //   if (j < len - 1) {
  //     right = right * nums[j + 1]
  //   }
  //   resultRight[j] = right
  // }
  // for (let i = 0; i < len; i++) {
  //   result[i] = result[i] * resultRight[i]
  // }
  // return result
  const length = nums.length;
  const answer = new Array(length);

  // answer[i] 表示索引 i 左侧所有元素的乘积
  // 因为索引为 '0' 的元素左侧没有元素， 所以 answer[0] = 1
  answer[0] = 1;
  for (let i = 1; i < length; i++) {
    answer[i] = nums[i - 1] * answer[i - 1];
  }

  // R 为右侧所有元素的乘积
  // 刚开始右边没有元素，所以 R = 1
  let R = 1;
  for (let i = length - 1; i >= 0; i--) {
    // 对于索引 i，左边的乘积为 answer[i]，右边的乘积为 R
    answer[i] = answer[i] * R;
    // R 需要包含右边所有的乘积，所以计算下一个结果时需要将当前值乘到 R 上
    R *= nums[i];
  }
  return answer;
};
console.log(productExceptSelf([1, 2, 3, 4])) // [24,12,8,6]