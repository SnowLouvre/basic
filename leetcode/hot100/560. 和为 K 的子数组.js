/*
 * 给你一个整数数组 nums 和一个整数 k ，请你统计并返回 该数组中和为 k 的连续子数组的个数 。
*/
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// 滑动窗口
var subarraySum = function (nums, k) {
  const len = nums.length
  let i = 0;
  let r = 0
  while (i < len) {
    let j = i;
    let result = 0;
    while (j < len) {
      result = result + nums[j]
      j++;
      if (result === k) {
        r++
      }
    }
    i++
  }
  return r
};
console.log(subarraySum([1, 1, 1], 2)) // 2
console.log(subarraySum([1, 2, 3], 3)) // 2
console.log(subarraySum([1, -1, 0], 0)) // 3