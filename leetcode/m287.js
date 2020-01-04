function naive(nums) {
  let i,j;
  let c1, found = false;

  for (i=0; i<nums.length; i++) {
    c1 = nums[i];
    for (j=0; j<nums.length; j++) {
      if (j===i) continue;
      if (c1 === nums[j]) {
        found = true;
        break;
      }
    }
    if (found) break;
  }

  return nums[j];
}

function optimal(nums) {
  nums.sort();
  let i, c1;
  for (i=0; i<nums.length-1; i++) {
    c1 = nums[i];
    if (c1 === nums[i+1]) break;
  }
  return c1;
}

/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function(nums) {
  return optimal(nums);
};
