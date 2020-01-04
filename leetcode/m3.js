/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  let ch = s.split('');
  let len = ch.length;

  /* O(n^2) algorithm */
  let longest = 0;
  let i, ch_j;
  for (i=0; i<len; i++) {
    let str = ch[i];
    let idx = {};

    idx[str] = true;
    for (j=i+1; j<len; j++) {
      ch_j = ch[j];
      if (idx[ch_j]) break;

      str+=ch_j;
      idx[ch_j] = j;
    }

    if (str.length > longest) {
      longest = str.length;
    }
  }

  return longest;
};
