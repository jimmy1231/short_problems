const ENUMERATE = n => {
  let arr = [], i;
  for (i=0; i<n; i++) arr.push(i+1);
  return arr;
};
const CONCAT = (targ, src) => targ.concat(src);
const BRACKETS = t => {
  let str = '';
  for (let i=0; i<t; i++) str+='()';
  return str;
};
let memoized = {};

function subproblem(arr) {
  /* Return memoized soln if exists */
  if (memoized[arr.length]) {
    return memoized[arr.length];
  }

  /* Base cases */
  if (arr.length === 0) return [''];
  if (arr.length === 1) return ['()'];

  /* Iterate through all combinations for arr */
  let ans = [BRACKETS(arr.length)];

  let _arr = [], _base, _tail, _body;
  let i, j;
  for (i=0; i<arr.length; i++) {
    _base = BRACKETS(i);

    for (j=i+1; j<arr.length; j++) {
      _tail = subproblem(arr.slice(j+1));
      _body = subproblem(_arr = CONCAT(_arr, arr[j]));
      _body.forEach(_b => _tail.forEach(_t =>
        ans.push(_base+`(${_b})${_t}`)
      ));
    }

    _arr = [];
  }

  memoized[arr.length] = ans;
  return ans;
}

/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
  return subproblem(ENUMERATE(n));
};
