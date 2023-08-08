/**
 * 给你一个大小为 m x n 的二进制矩阵 grid 。
 * 岛屿 是由一些相邻的 1 (代表土地) 构成的组合，这里的「相邻」要求两个 1 必须在 水平或者竖直的四个方向上 相邻。你可以假设 grid 的四个边缘都被 0（代表水）包围着。
 * 岛屿的面积是岛上值为 1 的单元格的数目。
 * 计算并返回 grid 中最大的岛屿面积。如果没有岛屿，则返回面积为 0 。
 * dfs bfs
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function (grid) {
  let count = 0,
    x = grid[0].length,
    y = grid.length;
  for (let i = 0; i < y; i++) {
    for (let j = 0; j < x; j++) {
      if (grid[i][j] === 1)
        count = Math.max(count, areaOfIsland(grid, i, j, y, x));
    }
  }
  return count;
};

var areaOfIsland = (grid, i, j, y, x) => {
  if (i >= y || i < 0 || j >= x || j < 0 || grid[i][j] === 0) return 0;
  let num = 1;
  grid[i][j] = 0;
  num += areaOfIsland(grid, i + 1, j, y, x);
  num += areaOfIsland(grid, i - 1, j, y, x);
  num += areaOfIsland(grid, i, j + 1, y, x);
  num += areaOfIsland(grid, i, j - 1, y, x);
  return num;
};
