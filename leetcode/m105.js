/**
 * https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */

let inorder_cpy = {};
const IS_LEFT = (inorder, n1, n2) => inorder_cpy[n1] < inorder_cpy[n2];
const IS_RIGHT = (inorder, n1, n2) => inorder_cpy[n1] > inorder_cpy[n2];

function insert(node, val, inorder) {
  if (node.left === null) {
    if (IS_LEFT(inorder, val, node.val)) {
      if (isValid(inorder, node, val)) {
        let newNode = new TreeNode(val);
        newNode.isRight = false;
        newNode.parent = node;
        node.left = newNode;
        return true;
      }
    }
  } else {
    if (insert(node.left, val, inorder)) {
      return true;
    }
  }

  if (node.right === null) {
    if (IS_RIGHT(inorder, val, node.val)) {
      if (isValid(inorder, node, val)) {
        let newNode = new TreeNode(val);
        newNode.isRight = true;
        newNode.parent = node;
        node.right = newNode;
        return true;
      }
    }
  } else {
    if (insert(node.right, val, inorder)) {
      return true;
    }
  }

  return false;
}

function isValid(inorder, node, val) {
  let _node = node;
  let valid = true;
  while (!_node.isRoot) {
    if (_node.isRight) {
      if (!IS_RIGHT(inorder, val, _node.parent.val)) {
        valid = false;
        break;
      }
    } else {
      if (!IS_LEFT(inorder, val, _node.parent.val)) {
        valid = false;
        break;
      }
    }
    _node = _node.parent;
  }
  return valid;
}

var buildTree = function(preorder, inorder) {
  if (preorder.length === 0) return null;
  inorder_cpy = {};

  let root = new TreeNode(preorder[0]);
  root.isRoot = true;
  let i;
  for (i=0; i<inorder.length; i++) {
    inorder_cpy[inorder[i]] = i;
  }
  for (i=1; i<preorder.length; i++) {
    insert(root, preorder[i], inorder);
  }

  return root;
};
