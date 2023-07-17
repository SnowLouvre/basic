/**
 * 1768. 交替合并字符串
 * 给你两个字符串 word1 和 word2 。请你从 word1 开始，通过交替添加字母来合并字符串。如果一个字符串比另一个字符串长，就将多出来的字母追加到合并后字符串的末尾。
 * 返回 合并后的字符串 。
 * @param {string} word1
 * @param {string} word2
 * @return {string}
 */
var mergeAlternately = function (word1, word2) {
  const smallLength = word1.length < word2.length ? word1.length : word2.length;
  let word = "";
  for (let i = 0; i < smallLength; i++) {
    word += word1[i];
    word += word2[i];
  }
  return word + word1.substring(smallLength) + word2.substring(smallLength);
};

/**
 * 1071. 字符串的最大公因子
 * 对于字符串 s 和 t，只有在 s = t + ... + t（t 自身连接 1 次或多次）时，我们才认定 “t 能除尽 s”。
 * 给定两个字符串 str1 和 str2 。返回 最长字符串 x，要求满足 x 能除尽 str1 且 x 能除尽 str2 。
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
var gcdOfStrings = function (str1, str2) {
  // 不相等则间接说明了不存在字符串X
  if (str1 + str2 !== str2 + str1) {
    return "";
  }
  // 最大公约数计算公式
  function gcd(num1, num2) {
    // 利用辗转相除法来计算最大公约数，即字符串X在字符串str1中截止的索引位置
    return num2 === 0 ? num1 : gcd(num2, num1 % num2);
  }

  // 截取匹配的字符串
  return str1.substring(0, gcd(str1.length, str2.length));
};

console.log(gcdOfStrings("ABAB", "AB"), "a");

/**
 * 给你一个数组 candies 和一个整数 extraCandies ，其中 candies[i] 代表第 i 个孩子拥有的糖果数目。
 * 对每一个孩子，检查是否存在一种方案，将额外的 extraCandies 个糖果分配给孩子们之后，此孩子有 最多 的糖果。注意，允许有多个孩子同时拥有 最多 的糖果数目。
 * @param {number[]} candies
 * @param {number} extraCandies
 * @return {boolean[]}
 */
var kidsWithCandies = function (candies, extraCandies) {
  // const booleanArray = Array(candies.length).fill(false)
  // for (let i = 0; i < candies.length; i++) {
  //     if (Math.max(candies[i] + extraCandies, ...candies) === candies[i] + extraCandies) {
  //         booleanArray[i] = true
  //     }
  // }
  // return booleanArray

  // 先把这个数组的最大值找出来
  let max = 0;
  // 定义一个数组,返回结果
  max = Math.max(...candies);
  return candies.map((n) => {
    return n + extraCandies >= max;
  });
};

/**
 * 605
 * 假设有一个很长的花坛，一部分地块种植了花，另一部分却没有。可是，花不能种植在相邻的地块上，它们会争夺水源，两者都会死去。
 * 给你一个整数数组 flowerbed 表示花坛，由若干 0 和 1 组成，其中 0 表示没种植花，1 表示种植了花。另有一个数 n ，能否在不打破种植规则的情况下种入 n 朵花？能则返回 true ，不能则返回 false 。
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */
var canPlaceFlowers = function (flowerbed, n) {
  let count = 0;
  for (let i = 0; i < flowerbed.length; i++) {
    if (
      (i - 1 < 0 || flowerbed[i - 1] === 0) &&
      flowerbed[i] === 0 &&
      (i + 1 >= flowerbed.length || flowerbed[i + 1] === 0)
    ) {
      count++;
      flowerbed[i] = 1;
    }
  }
  return count >= n;

  // better 可以先flowerbed.unshift(0) flowerbed.push(0)不用判断边界情况
};
console.log(canPlaceFlowers([1, 0, 0, 0, 1], 1));

/**
 * 238. 除自身以外数组的乘积 medium
 * 给你一个整数数组 nums，返回 数组 answer ，其中 answer[i] 等于 nums 中除 nums[i] 之外其余各元素的乘积 。
 * 题目数据 保证 数组 nums之中任意元素的全部前缀元素和后缀的乘积都在32位整数范围内。
 * 请不要使用除法，且在 O(n) 时间复杂度内完成此题。 空间复杂度O(1)
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
  // 利用索引左侧所有数字的乘积和右侧所有数字的乘积（即前缀与后缀）相乘得到答案
  let len = nums.length;
  let ans = Array.from({ length: len });
  let R = 1;
  ans[0] = 1;
  // ans[i]等于数组i左侧所有数字的乘积
  for (let i = 1; i < len; i++) {
    ans[i] = ans[i - 1] * nums[i - 1];
  }
  // 乘上R即所有右侧元素的乘积
  for (let i = len - 1; i >= 0; i--) {
    ans[i] = ans[i] * R;
    R *= nums[i];
  }
  return ans;
};

/**
 * 345. 反转字符串中的元音字母
 * 给你一个字符串 s ，仅反转字符串中的所有元音字母，并返回结果字符串。元音字母包括 'a'、'e'、'i'、'o'、'u'，且可能以大小写两种形式出现不止一次。
 * @param {string} s
 * @return {string}
 * 双指针 学会for和while的区别
 * for:应用于已知遍历次数的情况下。while:应用于遍历未知次数的情况下。
 */
var reverseVowels = function (s) {
  let stringArray = ["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"];
  //   let positionArray = Array(s.length).fill();
  let newS = s.split("");
  //   for (let i = 0; i < s.length; i++) {
  //     if (stringArray.includes(s[i])) {
  //       positionArray[i] = s[i];
  //     }
  //   }
  //   console.log(positionArray, newS)
  for (let i = 0; i < newS.length; i++) {
    for (j = newS.length - 1; j > i; j--) {
      if (stringArray.includes(newS[i]) && stringArray.includes(newS[j])) {
        // newS.splice(j, 1, positionArray[i]);
        // newS.splice(i, 1, positionArray[j]);
        // positionArray[j] = undefined;
        // positionArray[i] = undefined;
        const temp = newS[i];
        newS[i] = newS[j];
        newS[j] = temp;
      }
    }
  }
  return newS.join("");
};
console.log(reverseVowels("leetcode"), "reverseVowels");

// var reverseVowels = function(s) {
//     const n = s.length;
//     const arr = Array.from(s);
//     let i = 0, j = n - 1;
//     while (i < j) {
//         while (i < n && !isVowel(arr[i])) {
//             ++i;
//         }
//         while (j > 0 && !isVowel(s[j])) {
//             --j;
//         }
//         if (i < j) {
//             swap(arr, i, j);
//             ++i;
//             --j;
//         }
//     }
//     return arr.join('');
// }
// const isVowel = (ch) => {
//     return "aeiouAEIOU".indexOf(ch) >= 0;
// }
const swap = (arr, i, j) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

/**
 * 151. 反转字符串中的单词
 * 给你一个字符串 s ，请你反转字符串中 单词 的顺序。单词 是由非空格字符组成的字符串。s 中使用至少一个空格将字符串中的 单词 分隔开。
 * 返回 单词 顺序颠倒且 单词 之间用单个空格连接的结果字符串。
 * 注意：输入字符串 s中可能会存在前导空格、尾随空格或者单词间的多个空格。返回的结果字符串中，单词间应当仅用单个空格分隔，且不包含任何额外的空格。
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
  // return s.trim().split(/\s+/).reverse().join(' ');
  let string = s.trim().split(/\s+/);
  console.log(string);
  let i = 0;
  let j = string.length - 1;
  while (i < j) {
    swap(string, i, j);
    ++i;
    --j;
  }
  return string.join(" ");
};
console.log(reverseWords("the sky is blue"));

/**
 * 704. 二分查找
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return -1;
};

console.log(search([-1, 0, 3, 5, 9, 12], 9));

/**35. 搜索插入位置
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return left;
};
console.log(searchInsert([1, 3, 5, 6], 7));

/** 69 sqrt(x)
 * 给你一个非负整数 x ，计算并返回 x 的 算术平方根 。
 * 由于返回类型是整数，结果只保留 整数部分 ，小数部分将被 舍去 。
 * 注意：不允许使用任何内置指数函数和算符，例如 pow(x, 0.5) 或者 x ** 0.5 。
 * @param {number} x
 * @return {number}
 */
// var mySqrt = function (x) {
//   let left = 0;
//   let right = x;
//   while (left <= right) {
//     let mid = Math.floor((left + right) / 2);
//     if (mid * mid === x) {
//       return mid;
//     } else if (mid * mid > x) {
//       right = mid - 1;
//     } else {
//       left = mid + 1;
//     }
//   }
//   return right;
// };
// console.log(mySqrt(0), "mySqrt");