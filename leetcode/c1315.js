/**
 * https://leetcode.com/contest/biweekly-contest-17/problems/sum-of-nodes-with-even-valued-grandparent/
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
 * @return {number}
 */
function setTreeParent(node) {
  if (node === null) {
    return;
  }

  if (node.left !== null) {
    node.left.parent = node;
  }
  if (node.right !== null) {
    node.right.parent = node;
  }
  setTreeParent(node.left);
  setTreeParent(node.right);
}

const IS_EVEN = n => n%2 === 0;
let sum = 0;
function traverse(node) {
  if (node === null) {
    return;
  }

  let grandparent;
  if (node.parent !== null) {
    grandparent = node.parent.parent;
    if (grandparent !== null) {
      if (IS_EVEN(grandparent.val)) {
        sum+=node.val;
      }
    }
  }
  traverse(node.left);
  traverse(node.right);
}

var sumEvenGrandparent = function(root) {
  sum = 0;
  root.parent = null;
  setTreeParent(root);
  traverse(root);
  return sum;
};
