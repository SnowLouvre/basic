/*
 * 给定一个整数数组 nums，将数组中的元素向右轮转 k 个位置，其中 k 是非负数。
*/
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
    const len = nums.length;
    const realK = k % len
    // const arrA = nums.slice(len - 1 - realK)
    // const arrB = nums.slice(0, len - 1 - realK)
    // console.log(arrA, arrB)
    // return [...arrA, ...arrB]
    nums.splice(0, 0, ...nums.splice(len - realK))
    console.log(nums)
};
console.log(rotate([1,2,3,4,5,6,7], 3))