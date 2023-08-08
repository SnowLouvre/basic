/*
 *给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 。请
 *你返回所有和为 0 且不重复的三元组。
 *注意：答案中不可以包含重复的三元组。
 */
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  //   const len = nums.length;
  //   let result = [];
  //   for (let i = 0; i < len - 2; i++) {
  //     for (let j = i + 1; j < len - 1; j++) {
  //       for (let k = i + 2; k < len; k++) {
  //         console.log(nums[i], nums[j], nums[k], nums[i] + nums[j] + nums[k])
  //         if (nums[i] + nums[j] + nums[k] === 0) {
  //           result.push([nums[i], nums[j], nums[k]]);
  //         }
  //       }
  //     }
  //   }
  //   return result;
  let ans = [];
  const len = nums.length;
  if (nums == null || len < 3) return ans;
  nums.sort((a, b) => a - b); // 排序
  for (let i = 0; i < len; i++) {
    if (nums[i] > 0) break; // 如果当前数字大于0，则三数之和一定大于0，所以结束循环
    if (i > 0 && nums[i] == nums[i - 1]) continue; // 去重
    let L = i + 1;
    let R = len - 1;
    while (L < R) {
      const sum = nums[i] + nums[L] + nums[R];
      if (sum == 0) {
        ans.push([nums[i], nums[L], nums[R]]);
        while (L < R && nums[L] == nums[L + 1]) L++; // 去重
        while (L < R && nums[R] == nums[R - 1]) R--; // 去重
        L++;
        R--;
      } else if (sum < 0) L++;
      else if (sum > 0) R--;
    }
  }
  return ans;
};
console.log(threeSum([-1, 0, 1, 2, -1, -4])); // [[-1,-1,2],[-1,0,1]]
