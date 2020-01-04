let ans = [];

function recurse(node) {
  if (!node) return;

  if (node.left) {
    recurse(node.left);
  }
  ans.push(node.val);
  if (node.right) {
    recurse(node.right);
  }
}

function iterate(root) {
  if (!root) return;

  let curr_node = root, next_node;
  while (root.returned !== 2 ||
  !root.left_visited || !root.right_visited) {
    next_node = curr_node;
    if (!curr_node.left_visited) {
      curr_node.left_visited = true;
      if (curr_node.left) {
        curr_node.left.parent = curr_node;
        next_node = curr_node.left;
      }
    } else if (!curr_node.right_visited) {
      ans.push(curr_node.val);
      curr_node.right_visited = true;
      if (curr_node.right) {
        curr_node.right.parent = curr_node;
        next_node = curr_node.right;
      }
    }

    if (next_node === curr_node &&
      curr_node.left_visited &&
      curr_node.right_visited) {
      curr_node = curr_node.parent || root;
      curr_node.returned = curr_node.returned ? 2 : 1;
    } else {
      curr_node = next_node;
    }
  }
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
 * @return {number[]}
 */
var inorderTraversal = function(root) {
  ans = [];
  iterate(root);
  return ans;
};
