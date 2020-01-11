/**
 * https://leetcode.com/contest/biweekly-contest-17/problems/decompress-run-length-encoded-list/
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var decompressRLElist = function(nums) {
  let ans = [];

  let i, j;
  for (i=0; i<nums.length/2; i++) {
    let num = nums[2*i+1];
    let iters = nums[2*i];
    for (j=0; j<iters; j++) {
      ans.push(num);
    }
  }

  return ans;
};
