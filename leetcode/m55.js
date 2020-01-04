const TABS = t => {
  let i, _tabs = '';
  for (i=0; i<t; i++) _tabs+='\t';
  return _tabs;
};

let dp = {};
function subproblem(nums, l, len, depth) {
  let _n = Math.min(nums[l], len-1);
  if (l === len-1 || _n+l >= len-1) {
    return true;
  }
  if (dp.hasOwnProperty(l)) {
    return false;
  }
  if (l >= len) {
    dp[l] = false;
    return false;
  }

  let i;
  for (i=_n; i>0; i--) {
    if (subproblem(nums, l+i, len, depth+1)) {
      return true;
    }
  }

  /* memoize */
  dp[l] = false;
  return false;
}

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
  dp = {};
  return subproblem(nums, 0, nums.length, 0);
};
