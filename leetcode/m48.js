function init_matrix(width, height) {
  let matrix = [];

  let i,j;
  for (i=0; i<width; i++) {
    let _row = [];
    for (j=0; j<height; j++) {
      _row.push(0);
    }

    matrix.push(_row);
  }

  return matrix;
}

function __noninplace__(matrix, width, height) {
  let ans = init_matrix(width, height);

  let i,j, _i, _j;
  let _elem;
  for (i=0; i<height; i++) {
    for (j=0; j<width; j++) {
      _i = j;
      _j = width-1-i;
      ans[_i][_j] = matrix[i][j];

    }
  }

  return ans;
}

function __rotate__(m, width, height, i_s, j_s, j_e) {
  let _i, j, _j, _iold, _jold;
  let prev, prev_cpy;
  for (j=j_s; j<j_e; j++) {
    _j = j;
    _i = i_s;
    prev = m[_i][_j];
    do {
      _jold = _j;
      _iold = _i;
      _j = width-1-_iold;
      _i = _jold;
      prev_cpy = prev;
      prev = m[_i][_j];
      m[_i][_j] = prev_cpy;
    } while (!(_j===j && _i===i_s));
  }
}

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function(matrix) {
  if (!matrix.length) return;

  let height = matrix.length;
  let width = matrix[0].length;

  let d_bound = Math.floor(height/2);

  let d=0, j=0;
  while (d<d_bound) {
    __rotate__(matrix, width, height, d, d, width-d-1);
    d++;
  }
};
