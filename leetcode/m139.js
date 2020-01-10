/**
 * https://leetcode.com/problems/word-break/
 */

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
function recurse(s, wordDict) {
  if (!s.length) return true;

  let left, right;
  let i, u, l, word;
  for (i=0; i<wordDict.length; i++) {
    word = wordDict[i];
    u = s.indexOf(word);
    if (u >= 0) {
      l = u+word.length;
      left = recurse(s.slice(0, u), wordDict);
      right = recurse(s.slice(l), wordDict);
      if (left && right) {
        return true;
      }
    }
  }

  return false;
}

function bottomup(s, wordDict) {
  let dp = [true];

  let i, j;
  for (i=1; i<=s.length; i++) {
    for (j=0; j<i; j++) {
      if (dp[j] && wordDict.indexOf(s.slice(j, i)) >=0) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[s.length] || false;
}

var wordBreak = function(s, wordDict) {
  if (!wordDict.length) return false;
  return bottomup(s, wordDict);
};
