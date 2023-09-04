/** 300. 最长递增子序列
 * 给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。
 * 子序列 是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的子序列。
 * @param {number[]} nums
 * @return {number}
 */
// var lengthOfLIS = function (nums) {
//   const n = nums.length;
//   const dp = new Array(n).fill(1);
//   let result = 1
//   for (let i = 1; i < n; i++) {
//     for (let j = 0; j < i; j++) {
//       if (nums[i] > nums[j]) {
//         //当nums[i] > nums[j]，则构成一个上升对
//         dp[i] = Math.max(dp[i], dp[j] + 1); //更新dp[i]
//       }
//     }
//     result = Math.max(result, dp[i]); //更新结果
//   }
//   return result
// };
var lengthOfLIS = function(nums) {
    let n = nums.length;
    if (n <= 1) {
        return n;
    }
    let tail = [nums[0]];//存放最长上升子序列数组
    for (let i = 0; i < n; i++) {
        if (nums[i] > tail[tail.length - 1]) {//当nums中的元素比tail中的最后一个大时 可以放心push进tail
            console.log(i, nums[i], tail)
            tail.push(nums[i]);
        } else {//否则进行二分查找
            let left = 0;
            let right = tail.length - 1;
            while (left < right) {
                let mid = (left + right) >> 1;
                console.log(left, 'left', right, 'right', mid, tail[mid], nums[i])
                if (tail[mid] < nums[i]) {
                    left = mid + 1;
                } else {
                    right = mid;
                }
            }
            console.log(left, right, tail, nums[i], 111)
            tail[left] = nums[i];//将nums[i]放置到合适的位置，此时前面的元素都比nums[i]小
        }
    }
    console.log(tail)
    return tail.length;
  };
  
  console.log(lengthOfLIS([10,9,2,5,3,7,101,18]), 'lengthOfLIS')