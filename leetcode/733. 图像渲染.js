/**
 * 有一幅以 m x n 的二维整数数组表示的图画 image ，其中 image[i][j] 表示该图画的像素值大小。
 * 你也被给予三个整数 sr ,  sc 和 newColor 。你应该从像素 image[sr][sc] 开始对图像进行 上色填充 。
 * 为了完成 上色工作 ，从初始像素开始，记录初始坐标的 上下左右四个方向上 像素值与初始坐标相同的相连像素点，接着再记录这四个方向上符合条件的像素点与他们对应 四个方向上 像素值与初始坐标相同的相连像素点，……，重复该过程。将所有有记录的像素点的颜色值改为 newColor 。
 * 最后返回 经过上色渲染后的图像 。
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} color
 * @return {number[][]}
 */
var floodFill = function(image, sr, sc, color) {
    let x = image[0].length;
    let y = image.length

    const oldColor = image[sr][sc];
    if (oldColor == color) return image;

    const fill = (i, j) => {
        if (i < 0 || i >= x || j < 0 || j >= y || image[i][j] != oldColor) {
            return;
        }
        image[i][j] = color;
        fill(i - 1, j);
        fill(i + 1, j);
        fill(i, j - 1);
        fill(i, j + 1);
    };
    fill(sr, sc);
    return image;
}


var preorderTraversal = function(root) {
    const res = []
    const preorderTraversalRecursion = function(root, res) {
        if (root) {
            res.push(root.val);
            preorderTraversalRecursion(root.left, res)
            preorderTraversalRecursion(root.right, res)
        }
        return res
    }
    return preorderTraversalRecursion(root, res)
};