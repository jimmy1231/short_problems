/**
 * https://leetcode.com/problems/validate-binary-search-tree/
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
 * @return {boolean}
 */

function traverse(node, min, max) {
  if (!node) return true;

  let val = node.val;
  if (val <= min || val >= max) {
    return false;
  }
  let _left = node.left, _right = node.right;
  if (_left && _left.val >= val) {
    return false;
  }
  if (_right && _ right.val <= val) {
    return false;
  }

  if (!traverse(_left, min, val)) {
    return false;
  }
  if (!traverse(_right, val, max)) {
    return false;
  }
  return true;
}

var isValidBST = function(root) {
  return traverse(root, -Infinity, Infinity);
};
