let mem = {};

function L(M, i1, j1, i2, j2) {
  if (i1 === i2 && j1 === j2) {
    return M[i1][j1];
  }
  if (i2 < i1 || j2 < j1) {
    return 0;
  }
  let idx = `${i1},${j1}-${i2},${j2}`;
  if (mem.hasOwnProperty(idx)) {
    return mem[idx];
  }

  let L_i1j1i2j2 = Math.max(
    maxArea(M, i1, j1, i2, j2),
    L(M, i1, j1, i2, j2-1),
    L(M, i1, j1, i2-1, j2),
    L(M, i1, j1+1, i2, j2),
    L(M, i1+1, j1, i2, j2)
  );

  mem[idx] = L_i1j1i2j2;
  return L_i1j1i2j2;
}

function maxArea(M, i1, j1, i2, j2) {
  let d = Math.min(j2-j1+1, i2-i1+1);
  let max = 0;

  let i, j;
  for (i=i1; i<=(i2+1-d); i++) {
    for (j=j1; j<=(j2+1-d); j++) {
      max = Math.max(area(M, i, j, d), max);
    }
  }

  return max;
}

function brute(M, n, m) {
  let max = 0;
  let i, j;
  for (i=0; i<n; i++) {
    for (j=0; j<m; j++) {
      let d = 1;
      while (i+d <= n && j+d <= m) {
        max = Math.max(max, area(M, i, j, d));
        d++;
      }
    }
  }

  return max;
}

function area(M, i_s, j_s, d) {
  let area = 0;

  let i, j, m;
  for (i=i_s; i<i_s+d; i++) {
    for (j=j_s; j<j_s+d; j++) {
      m = M[i][j];
      if (m === 0) {
        return 0;
      }
      area+=m;
    }
  }

  return area;
}

/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalSquare = function(matrix) {
  mem = {};
  if (!matrix.length) return 0;
  matrix = matrix.map(N => N.map(M => parseInt(M)));

  let n = matrix.length;
  let m = matrix[0].length;
  // return L(matrix, 0, 0, n-1, m-1);
  return brute(matrix, n, m);
};
