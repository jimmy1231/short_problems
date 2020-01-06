/**
 * https://leetcode.com/problems/remove-nth-node-from-end-of-list/
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
  /*
   * Idea: we do 1 pass where we store index of each node.
   * Then, once we reach the end, we'll know the index
   * of the element before the one we want to remove by doing
   * (# nodes in list)-n
   * Then, since this is a singly linked list, we set that
   * node to node.next.next;
   */
  let stored = {};

  let node = head, i = 0;
  while (node !== null) {
    i++;
    stored[i] = node;
    node = node.next;
  }

  let _n = stored[(i-n)];

  // removing 1st element
  if (!_n) {
    return head.next;
  }

  _n.next = _n.next.next;
  return head;
};
