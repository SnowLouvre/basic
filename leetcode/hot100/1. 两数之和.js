/*
 * 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
 * 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。
 * 你可以按任意顺序返回答案。
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  // let result = []
  // const len = nums.length
  // for (let i = 0; i < len; i++) {
  //     for (let j = i + 1; j < len; j++) {
  //         if (nums[i] + nums[j] === target && i !== j) {
  //             result = [i, j]
  //         }
  //     }
  // }
  // return result
  // 暴力做法每次拿两个数出来相加，和 target\textit{target}target 比较，那么花费 O(1)\mathcal{O}(1)O(1) 的时间，只获取了 O(1)\mathcal{O}(1)O(1) 的信息。
  // 而哈希表做法，每次查询都能知道 O(n)\mathcal{O}(n)O(n) 个数中是否有 target−nums[j]\textit{target}-\textit{nums}[j]target−nums[j]，那么花费 O(1)\mathcal{O}(1)O(1) 的时间，就获取了 O(n)\mathcal{O}(n)O(n) 的信息。

  let idx = new Map(); // 创建一个空哈希表
  for (let j = 0; ; j++) {
    // 枚举 j
    const x = nums[j];
    // 在左边找 nums[i]，满足 nums[i]+x=target
    if (idx.has(target - x))
      // 找到了
      return [idx.get(target - x), j]; // 返回两个数的下标
    idx.set(x, j); // 保存 nums[j] 和 j
  }
};
console.log(twoSum([2, 7, 11, 15], 9));
