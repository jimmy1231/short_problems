/**
 * https://leetcode.com/problems/copy-list-with-random-pointer/
 */

/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */
/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function(head) {
  if (!head) return null;

  let saved = [];

  /* In order traversal of list */
  let curr = head, prev = null, i=0;
  while (curr !== null) {
    curr.prev = prev;
    curr.i = i;
    if (curr.next === null) {
      break;
    }
    prev = curr;
    curr = curr.next;
    i++;
  }

  /* curr is now tail, deep copy */
  let cpy_curr, next = null;
  while (curr !== null) {
    cpy_curr = new Node(curr.val, next,
      curr.random !== null ? curr.random.i : null);
    next = cpy_curr;
    curr = curr.prev;
    saved[i] = cpy_curr;
    i--;
  }

  let ans = cpy_curr;
  curr = cpy_curr;
  while (curr !== null) {
    if (curr.random !== null) {
      curr.random = saved[curr.random];
    }
    curr = curr.next;
  }

  return ans;
};
