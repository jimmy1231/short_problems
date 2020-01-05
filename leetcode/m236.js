function dfs(node, parent, val, depth) {
  if (node === null) {
    return false;
  }
  node.depth = depth;
  node.parent = parent;
  if (node.val === val) {
    return true;
  }

  if (dfs(node.left, node, val, depth+1)) {
    return true;
  }
  if (dfs(node.right, node, val, depth+1)) {
    return true;
  }

  return false;
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
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
  dfs(root, null, p.val, 0);
  dfs(root, null, q.val, 0);

  let pCurr = p, qCurr = q;
  let pDepth = p.depth, qDepth = q.depth;
  while (pDepth > qDepth) {
    pCurr = pCurr.parent;
    pDepth--;
  }

  while (qDepth > pDepth) {
    qCurr = qCurr.parent;
    qDepth--;
  }

  let turn = true;
  while (pCurr.val !== qCurr.val) {
    if (turn) {
      pCurr = pCurr.parent;
    } else {
      qCurr = qCurr.parent;
    }
    turn = !turn;
  }

  return pCurr;
};
