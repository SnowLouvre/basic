/*
 * 给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。
 * 请你设计并实现时间复杂度为 O(n) 的算法解决此问题。
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
// 
var longestConsecutive = function (nums) {
//   const array = nums.sort((a, b) => a - b);
//   console.log(array);
  // const len = array.length
  // // const dp = new Array(len).fill(0)
  // // dp[0] = 1
  // // for (let i = 1; i < len; i++) {
  // //     dp[i] = Math.max(dp[i - 1], )
  // // }
  // let idx = new Map()
  // for (let j = 0; ; j++) {
  //     // 枚举 j
  //     const x = nums[j];
  //     // 在左边找 nums[i]，满足 nums[i]+x=target
  //     if (idx.has(target - x))
  //       // 找到了
  //       return [idx.get(target - x), j]; // 返回两个数的下标
  //     idx.set(x, j); // 保存 nums[j] 和 j
  //   }
  // 把题目中数组的数字全部放入set中，一来去重，二来方便快速查找
  const set = new Set(nums);
  let max = 0;
//   for (let [key, a] of set.entries()) {
  for (let a of set.values()) {
    // 没有左邻居，是序列的起点
    if (!set.has(a - 1)) {
      let count = 1;
      let cur = a;
      // 有右邻居，看连续的右邻居有多少个
      while (set.has(cur + 1)) {
        cur++;
        count++;
      }
      // 存放最大的连续邻居的值
      max = Math.max(max, count);
    }
  }
  return max;
};
console.log(longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]));
