/**
 * https://leetcode.com/contest/biweekly-contest-17/problems/distinct-echo-substrings/
 */

/**
 * @param {string} text
 * @return {number}
 */
const IS_EVEN = n => n%2 === 0;

var distinctEchoSubstrings = function(text) {
  // find all possible substrings
  // check if each substring can be split (first half of substring equals 2nd half of substring)
  let output = 0;
  let saved = {};

  let i, j;
  let substr, mid, right, left;
  for (i=0; i<text.length; i++) {
    substr = '';
    for (j=i; j<text.length; j++) {
      substr += text[j];
      if (!IS_EVEN(substr.length)) {
        continue;
      }
      mid = substr.length/2;
      left = substr.slice(0, mid);
      right = substr.slice(mid);
      if (left === right && !saved.hasOwnProperty(left)) {
        saved[left] = true;
        output++;
      }
    }
  }
  return output;
};
