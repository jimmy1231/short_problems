/**
 * https://leetcode.com/problems/binary-tree-level-order-traversal/
 */

function levelTraverse(node, ans, depth) {
  /* Traverse normally, insert current node in depth */
  if (node === null) {
    return;
  }
  if (!ans[depth]) {
    ans[depth] = [node.val];
  } else {
    ans[depth].push(node.val);
  }

  levelTraverse(node.left, ans, depth+1);
  levelTraverse(node.right, ans, depth+1);
}

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
  let ans = [];
  levelTraverse(root, ans, 0);
  return ans;
};
