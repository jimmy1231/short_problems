let soln = {};

function subproblem(s, idx) {
  let count = 0;
  const _i = `${idx}:${s}`;
  if (soln[_i]) {
    return 0;
  } else if (s === s.split('').reverse().join('')) {
    soln[_i] = true;
    count++;
  }

  if (s.length > 1) {
    let s1 = s.slice(0, s.length-1);
    let s2 = s.slice(1);

    count+=subproblem(s1, idx);
    count+=subproblem(s2, idx+1);
  }

  return count;
}

function iterate(s) {
  let count = 0;
  let charArr = s.split('');
  let len = charArr.length;

  let i;
  for (i=0; i<len; i++) {
    count+=check(charArr, i, i, len);
    count+=check(charArr, i, i+1, len);
  }
  return count;
}

function check(charArr, l, r, len) {
  let count = 0;
  while (l>=0 && r<len) {
    if (charArr[l] === charArr[r])
      count++;
    else
      break;

    l--;
    r++;
  }
  return count;
}

/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function(s) {
  // soln = {}; /* re-initialize */
  // return subproblem(s, 0);
  return iterate(s);
};
