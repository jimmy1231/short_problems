/**
 * https://leetcode.com/problems/longest-palindromic-substring/
 */

/**
 * @param {string} s
 * @return {string}
 */
function bruteforce(s) {
  let longest = '';

  let _s, _sReverse;
  let i, j;
  for (i=0; i<s.length; i++) {
    _s = '';
    _sReverse = '';
    for (j=i; j<s.length; j++) {
      _s += s[j];
      _sReverse = s[j] + _sReverse;
      if (_sReverse === _s) {
        if (_s.length > longest.length) {
          longest = _s;
        }
      }
    }
  }

  return longest;
}

function extendingPalindrome(s) {
  let lo=0, hi=0;

  const extend = (s, l, u) => {
    let len = s.length;
    while (l>=0 && u<len && s[l] === s[u]) {
      l--;
      u++;
    }

    l++;
    u--;
    if (u-l > hi-lo) {
      lo = l;
      hi = u;
    }
  };

  let i;
  for (i=0; i<s.length-1; i++) {
    extend(s, i, i);
    extend(s, i, i+1);
  }

  return s.slice(lo, hi+1);
}

var longestPalindrome = function(s) {
  return extendingPalindrome(s);
};
