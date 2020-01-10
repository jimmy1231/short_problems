/**
 * https://leetcode.com/problems/number-of-islands/
 */

/**
 * @param {character[][]} grid
 * @return {number}
 */
function bfs(grid, i, j, h, w) {
  let q = [i*w+j];
  grid[i][j] = 0;
  let _i, _j;
  let code;

  while (q.length) {
    code = q.shift();
    _i = parseInt(code/w);
    _j = code%w;

    // up
    if ((_i-1)>=0 && grid[_i-1][_j] > 0) {
      q.push((_i-1)*w+_j);
      grid[_i-1][_j] = 0;
    }
    // down
    if ((_i+1)<h && grid[_i+1][_j] > 0) {
      q.push((_i+1)*w+_j);
      grid[_i+1][_j] = 0;
    }
    // left
    if (grid[_i][_j-1] > 0) {
      q.push(_i*w+_j-1);
      grid[_i][_j-1] = 0;
    }
    // right
    if (grid[_i][_j+1] > 0) {
      q.push(_i*w+_j+1);
      grid[_i][_j+1] = 0;
    }
  }
}

var numIslands = function(grid) {
  if (!grid.length) return 0;

  let closed = grid.map(g => g.slice());
  let h = grid.length, w = grid[0].length;

  let row, col;
  let count = 0;
  let i, j;
  for (i=0; i<grid.length; i++) {
    row = grid[i];
    for (j=0; j<row.length; j++) {
      if (grid[i][j] > 0) {
        count++;
        bfs(grid, i, j, h, w);
      }
    }
  }

  return count;
};
