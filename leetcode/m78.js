function recursive(nums) {
  let output = [[]];

  let i, j;
  let num, _len;
  for (i=0; i<nums.length; i++) {
    num = nums[i];
    _len = output.length;
    for (j=0; j<_len; j++) {
      output.push([num, ...output[j]]);
    }
  }
  return output;
}

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
  return recursive(nums);
};
