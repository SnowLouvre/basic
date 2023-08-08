/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * 给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。
 * 百度百科中最近公共祖先的定义为：“对于有根树 T 的两个节点 p、q，最近公共祖先表示为一个节点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  const travelTree = function (root, p, q) {
    // 2. 确定递归终止条件
    if (root === null || root === p || root === q) {
      return root;
    }
    // 3. 确定递归单层逻辑
    let left = travelTree(root.left, p, q);
    let right = travelTree(root.right, p, q);
    //如果在某一个节点的左右子树都能找到p和q说明这个节点就是公共祖先
    if (left !== null && right !== null) {
      return root;
    }
    if (left === null) {
      //如果左子树没找到就说明p，q都在右子树
      return right;
    }
    return left; //如果右子树没找到就说明p，q都在左子树
  };
  return travelTree(root, p, q); //递归开始
};
