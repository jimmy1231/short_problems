/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */

const IS_LEAF = node => !node || !node.right && !node.left;

function recurse(node) {
  if (!node) return;

  let _left = node.left;
  let _right = node.right;

  /* base case */
  if (IS_LEAF(_left) && IS_LEAF(_right)) {
    if (_left) {
      node.left = null;
      node.right = _left;
      _left.right = _right;
    }
    /*
     * Else do nothing because either right
     * is there, in which case it's already
     * correctly attached to 'node', or
     * right is null, which is trivial.
     */
    return;
  }

  recurse(_left);
  recurse(_right);

  let _curr = _left;
  while (_curr) {
    if (!_curr.right) {
      break;
    }
    _curr = _curr.right;
  }

  /*
   * '_curr' is now the 'tail' of '_left'
   * Again, we handle the same edge case as above
   */
  if (_left) {
    node.left = null;
    node.right = _left;
    _curr.right = _right;
  }
}

var flatten = function(root) {
  recurse(root);
};
