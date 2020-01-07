/**
 * https://leetcode.com/problems/word-search/
 */

let closed = {};
function subproblem(board, n, m, i, j, wordArr, idx) {
  if (idx >= wordArr.length) {
    return true;
  }
  if (i<0 || i>=n || j<0 || j>=m) {
    return false;
  }
  let closedId = `${i}-${j}`;
  if (closed.hasOwnProperty(closedId)) {
    return false;
  }

  let found;
  if (board[i][j] === wordArr[idx]) {
    closed[closedId] = true;
    found = (
      subproblem(board, n, m, i+1, j, wordArr, idx+1) ||
      subproblem(board, n, m, i-1, j, wordArr, idx+1) ||
      subproblem(board, n, m, i, j+1, wordArr, idx+1) ||
      subproblem(board, n, m, i, j-1, wordArr, idx+1)
    );
    if (!found) {
      delete closed[closedId];
    }
    return found;
  } else {
    return false;
  }
}

/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
  if (!board.length) {
    return word.length === 0;
  }

  let wordArr = word.split('');
  let n = board.length;
  let m = board[0].length;

  let found = false;
  let i, j;
  for (i=0; i<n; i++) {
    for (j=0; j<m; j++) {
      if (board[i][j] === wordArr[0]) {
        closed = {};
        closed[`${i}-${j}`] = true;
        found = (
          subproblem(board, n, m, i+1, j, wordArr, 1) ||
          subproblem(board, n, m, i-1, j, wordArr, 1) ||
          subproblem(board, n, m, i, j+1, wordArr, 1) ||
          subproblem(board, n, m, i, j-1, wordArr, 1)
        );

        if (found) {
          return true;
        }
      }
    }
  }

  return false;
};
