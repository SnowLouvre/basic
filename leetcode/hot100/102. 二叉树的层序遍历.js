/*
 * 给你二叉树的根节点 root ，返回其节点值的层序遍历。（即逐层地，从左到右访问所有节点）。
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 * 输入：root = [3,9,20,null,null,15,7]
 * 输出：[[3],[9,20],[15,7]]
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  //   const results = [];
  //   if (!root) {
  //     return results;
  //   }
  //   const queue = [root];
  //   while (queue.length) {
  //     const node = queue.shift();
  //     results.push(node.val);
  //     if (root.left) {
  //       queue.push(node.left);
  //     } else if (node.right) {
  //       queue.push(node.right);
  //     }
  //   }
  //   return results;
  const ret = [];
  if (!root) {
    return ret;
  }

  const q = [];
  q.push(root);
  while (q.length !== 0) {
    const currentLevelSize = q.length;
    ret.push([]);
    for (let i = 1; i <= currentLevelSize; ++i) {
      const node = q.shift();
      ret[ret.length - 1].push(node.val);
      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
  }
  return ret;
};
console.log(levelOrder([3, 9, 20, null, null, 15, 7]))
