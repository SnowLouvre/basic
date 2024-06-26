/*
 *给定一个包含红色、白色和蓝色、共 n 个元素的数组 nums ，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。
 *我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。
 *必须在不使用库内置的 sort 函数的情况下解决这个问题。
*/
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function (nums) {
  // const len = nums.length
  // let i = 0
  // let j = len - 1
  // while (i < len) {
  //   if (nums[i] === 2 && i < j) {
  //     const number = nums.splice(i, 1)
  //     nums.push(number[0])
  //     j--
  //   } else if (nums[i] === 1 && nums[j] === 0) {
  //     const temp = nums[j]
  //     nums[j] = nums[i]
  //     nums[i] = temp
  //   } else if (nums[i] === 1 && nums[j] >= 1) {
  //     j--
  //   } else {
  //     i++
  //   }
  // }
  // console.log(nums)
  let p = -1
  let q = nums.length
  let i = 0
  while (i < q) {
    if (nums[i] == 0) {
      swap(nums, i, p + 1)
      p = p + 1
      i++
    } else if (nums[i] == 2) {
      swap(nums, i, q - 1)
      q = q - 1
    } else if (nums[i] == 1) {
      i++
    }
  }
  function swap(arr, a, b) {
    let tmp = arr[a];
    arr[a] = arr[b]
    arr[b] = tmp;
  }
  return nums
};
console.log(sortColors([2, 0, 2, 1, 1, 0])) // [0,0,1,1,2,2] 
// [0,1,1,0,2,2] [0,0,1,1,2,2]