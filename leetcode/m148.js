/**
 * https://leetcode.com/problems/sort-list/
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
 * @return {ListNode}
 */
function indexOf(head, p) {
  let idx = 0;
  while (head !== null) {
    if (head === p) {
      return idx;
    }
    idx++;
    head = head.next;
  }
  return -1;
}

function quicksort(head, p, r) {
  let prev,next;
  if (p !== null && r !== null && indexOf(head, p) < indexOf(head, r)) {
    ({prev, next} = partition(head, p, r));
    quicksort(head, p, prev);
    quicksort(head, next, r);
  }
}

function partition(head, p, r) {
  let i = p, start = true;
  let j = p;
  let cpy;
  while (j !== r) { // reference equality
    if (j.val <= r.val) {
      if (!start) {
        i = i.next;
      } else {
        start = false;
      }
      // shallow swap
      cpy = j.val;
      j.val = i.val;
      i.val = cpy;
    }
    j = j.next;
  }

  let q = start ? p : i.next;
  cpy = r.val;
  r.val = q.val;
  q.val = cpy;
  return {
    prev: i,
    next: q.next
  };
}

var sortList = function(head) {
  if (head === null) return head;

  let tail = head;
  while (true) {
    if (tail.next === null) {
      break;
    }
    tail = tail.next;
  }

  quicksort(head, head, tail);
  return head;
};
