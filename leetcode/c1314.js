/**
 * https://leetcode.com/contest/biweekly-contest-17/problems/matrix-block-sum/
 */

/**
 * @param {number[][]} mat
 * @param {number} K
 * @return {number[][]}
 */
var matrixBlockSum = function(mat, K) {
  if (mat.length === 0) return mat;

  let ans = [];
  let h = mat.length, w = mat[0].length;
  let i, j;
  let r_lower, r_upper, c_lower, c_upper;
  let r, c;
  let sum;
  for (i=0; i<h; i++) {
    for (j=0; j<w; j++) {
      r_lower = Math.max(0, i-K);
      r_upper = Math.min(h-1, i+K);
      c_lower = Math.max(0, j-K);
      c_upper = Math.min(w-1, j+K);
      sum = 0;
      for (r=r_lower; r<=r_upper; r++) {
        for (c=c_lower; c<=c_upper; c++) {
          sum += mat[r][c];
        }
      }
      if (!ans[i]) {
        ans[i] = [];
      }
      ans[i][j] = sum;
    }
  }

  return ans;
};
