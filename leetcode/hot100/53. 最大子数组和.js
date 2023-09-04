/*
 * 给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
 * 子数组 是数组中的一个连续部分。
*/
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    // const len = nums.length
    // let result = -Infinity

    // for (let i = 0; i < len; i++) {
    //     let temp = 0
    //     let max = -Infinity
    //     for (let j = i; j < len; j++) {
    //         temp = temp + nums[j]
    //         max = Math.max(max, temp)
    //     }
    //     result = Math.max(result, max)
    // }
    // return result
    // 动态规划
    let pre = 0, maxAns = nums[0];
    nums.forEach((x) => {
        pre = Math.max(pre + x, x);
        maxAns = Math.max(maxAns, pre);
    });
    return maxAns;
};
console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4])) // 6
console.log(maxSubArray([5,4,-1,7,8])) // 23
console.log(maxSubArray([-1])) // -1