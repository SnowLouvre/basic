/*
 * 以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。请你合并所有重叠的区间，并返回 一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间。
 * 输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
 * 输出：[[1,6],[8,10],[15,18]]
 * 解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
 */
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  const len = intervals.length;
  let i = 0;
  let j = len - 1;
  const arr = intervals.sort((a, b) => {
    return a[0] - b[0];
  });
//   console.log(arr);
  while (i < j) {
    if (arr[i][1] >= arr[i + 1][0]) {
      arr[i] = [arr[i][0], Math.max(arr[i][1], arr[i + 1][1])];
      arr.splice(i + 1, 1);
      j--;
    } else {
      i++;
    }
  }
  return arr;
};
console.log(
  merge([
    [1, 3],
    [2, 6],
    [8, 10],
    [15, 18],
  ])
); // [[1,6],[8,10],[15,18]]
console.log(
  merge([
    [1, 4],
    [2, 3],
  ])
);
console.log(
  merge([
    [1, 4],
    [0, 2],
    [3, 5],
  ])
);
