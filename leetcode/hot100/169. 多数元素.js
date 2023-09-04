/*
 * 给定一个大小为 n 的数组 nums ，返回其中的多数元素。多数元素是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素。
 * 你可以假设数组是非空的，并且给定的数组总是存在多数元素。
 * 进阶：尝试设计时间复杂度为 O(n)、空间复杂度为 O(1) 的算法解决此问题。
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
  // 1
  //   nums.sort((a, b) => a - b);
  //   return nums[Math.floor(nums.length / 2)];
  // 2 哈希表
  const len = nums.length;
  const map = new Map();
  for (let i = 0; i < len; i++) {
    if (map.has(nums[i])) {
      const num = map.get(nums[i]);
      map.set(nums[i], num + 1);
    } else {
      map.set(nums[i], 1);
    }
    if (map.get(nums[i]) > len / 2) return nums[i];
  }
};
console.log(majorityElement([3, 2, 3])); // 3
