/**
 * https://leetcode.com/problems/unique-binary-search-trees/
 */

function recursion(n) {
  let array = [];
  let i;
  for (i=0; i<n; i++) {
    array.push(i+1);
  }
  return recurse(array, null);
}

function recurse(subarray) {
  if (subarray.length === 0 ||
    subarray.length === 1) return 1;

  let total = 0;
  let i;
  for (i=0; i<subarray.length; i++) {
    let left = subarray.slice(0, i);
    let right = subarray.slice(i+1);
    total += recurse(left)*recurse(right);
  }
  return total;
}

function bottom_up(n) {
  let dp = [1];
  let i, j, total;
  for (i=1; i<=n; i++) {
    total = 0;
    for (j=1; j<=i; j++) {
      total += dp[i-j]*dp[j-1];
    }
    dp[i] = total;
  }

  return dp[n];
}

/**
 * @param {number} n
 * @return {number}
 */
var numTrees = function(n) {
  return bottom_up(n);
};
