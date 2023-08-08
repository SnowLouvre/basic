/*
 * 给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。
 * 找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
 * 返回容器可以储存的最大水量。
 * 说明：你不能倾斜容器。
*/
/**
 * @param {number[]} height
 * @return {number}
 */
// 双指针
var maxArea = function (height) {
  const len = height.length
  let i = 0;
  let j = len - 1
  let result = 0
  while (i < j) {
    result = Math.max(result, Math.min(height[i], height[j]) * (j - i))
    if (height[i] <= height[j]) {
      i++
    } else {
      j--
    }
  }
  return result
};
console.log(maxArea([1,8,6,2,5,4,8,3,7])) // 49
console.log(maxArea([1, 1])) // 1