let memoize = {};
function P(grid, i, j, dest_i, dest_j) {
  if (i > dest_i || j > dest_j) {
    return Infinity;
  }
  if (i === dest_i && j === dest_j) {
    return grid[i][j];
  }
  let idx = `${i},${j}`;
  if (memoize.hasOwnProperty(idx)) {
    return memoize[idx];
  }

  let P_ij = Math.min(
    P(grid, i+1, j, dest_i, dest_j),
    P(grid, i, j+1, dest_i, dest_j)
  ) + grid[i][j];
  memoize[idx] = P_ij;

  return P_ij;
}

/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
  memoize = {};
  let m, n;

  m = grid.length;
  n = grid[0].length;
  return P(grid, 0, 0, m-1, n-1);
};
