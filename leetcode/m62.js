/**
 * https://leetcode.com/problems/unique-paths/
 */

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
  if (!m || !n) {
    return 0;
  }

  // Bottom-up dp
  let dp = [];
  let _e = [];

  /* Initialize trivial case */
  dp[n-1] = _e;
  _e[m-1] = 1;

  let i, j, _j;
  for (i=(n-1); i>=0; i--) {
    _j = i === (n-1) ? (m-2) : (m-1);
    if (i !== n-1) {
      dp[i] = [];
    }
    for (j=_j; j>=0; j--) {
      let d, r;
      r = j+1 >= m ? 0 : dp[i][j+1];
      d = i+1 >= n ? 0 : dp[i+1][j];

      dp[i][j] = r+d;
    }
  }

  return dp[0][0];
};
