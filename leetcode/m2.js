function naive_doesntwork(l1, l2) {
  const traverse = l => {
    let acc = [];
    let curr = l;
    while (curr !== null) {
      acc.unshift(`${curr.val}`);
      curr = curr.next;
    }

    return parseInt(acc.join(''), 10);
  };

  let str = `${traverse(l1)+traverse(l2)}`;
  let h, curr, prev = null;
  str.split('').forEach((s, i) => {
    curr = new ListNode(parseInt(s));
    if (i === str.length-1) {
      h = curr;
    }
    curr.next = prev;
    prev = curr;
  });

  return h;
}

function works(l1, l2) {
  let l1_curr = l1, l2_curr = l2;
  let ans, curr_ans, prev_ans;

  let i=0, sum=0, carry=0;
  while (l1_curr || l2_curr || carry) {
    sum = (l1_curr ? l1_curr.val : 0)
      +(l2_curr ? l2_curr.val : 0)
      +carry;

    carry = sum >= 10 ? 1 : 0;
    sum = carry ? sum-10 : sum;

    curr_ans = new ListNode(sum);
    if (i === 0) {
      ans = curr_ans;
    } else {
      prev_ans.next = curr_ans;
    }
    prev_ans = curr_ans;

    if (l1_curr) {
      l1_curr = l1_curr.next;
    }
    if (l2_curr) {
      l2_curr = l2_curr.next;
    }
    i++;
  }

  return ans;
}

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
  return works(l1, l2);
};
