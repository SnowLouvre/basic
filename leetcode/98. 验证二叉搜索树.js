/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * 给你一个二叉树的根节点 root ，判断其是否是一个有效的二叉搜索树。
 * 有效 二叉搜索树定义如下：
 * 节点的左子树只包含 小于 当前节点的数。
 * 节点的右子树只包含 大于 当前节点的数。
 * 所有左子树和右子树自身必须也是二叉搜索树。
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function (root) {
  const helper = (root, lower, upper) => {
    if (root === null) {
      return true;
    }
    if (root.val <= lower || root.val >= upper) {
      //终止条件 不满足二叉搜索树的性质
      return false;
    }
    //递归左右子树
    return (
      helper(root.left, lower, root.val) && helper(root.right, root.val, upper)
    );
  };
  return helper(root, -Infinity, Infinity);
};
console.log(isValidBST([5,1,4,null,null,3,6]))
