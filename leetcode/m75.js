/**
 * https://leetcode.com/problems/sort-colors/
 */

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function(nums) {
  if (nums.length === 0) {
    return;
  }

  // counting sort
  let count = [0, 0, 0];

  let i;
  for (i=0; i<nums.length; i++) {
    count[nums[i]]++;
  }

  count[1] = count[0]+count[1];
  count[2] = count[1]+count[2];

  let cpy = nums.slice(), n;
  for (i=0; i<cpy.length; i++) {
    n = cpy[i];
    nums[count[n]-1] = n;
    count[n]--;
  }
};
