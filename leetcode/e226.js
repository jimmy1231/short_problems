/**
 * https://leetcode.com/problems/invert-binary-tree/
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
function recursiveSwap(node) {
  if (node === null) {
    return;
  }

  let _left = node.left;
  node.left = node.right;
  node.right = _left;
  recursiveSwap(node.left);
  recursiveSwap(node.right);
}

var invertTree = function(root) {
  recursiveSwap(root);
  return root;
};
