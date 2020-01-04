const lut = {
  '2': ['a','b','c'],
  '3': ['d','e','f'],
  '4': ['g','h','i'],
  '5': ['j','k','l'],
  '6': ['m','n','o'],
  '7': ['p','q','r','s'],
  '8': ['t','u','v'],
  '9': ['w','x','y','z']
};

function recurse(nums, idx, str) {
  if (idx >= nums.length) {
    return [str];
  }
  let _alph = lut[nums[idx]];

  let ans = [];
  let i, _str;
  for (i=0; i<_alph.length; i++) {
    _str = str+_alph[i];
    recurse(nums, idx+1, _str).forEach(r => ans.push(r));
  }

  return ans;
}

/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
  let nums = digits.split('');
  if (!nums.length) return [];

  return recurse(nums, 0, '');
};
