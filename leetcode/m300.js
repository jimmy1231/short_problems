/**
 * https://leetcode.com/problems/longest-increasing-subsequence/
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
  if (nums.length === 0) return 0;

  let ans = [];
  let n, count, max=1;
  let i, j;
  ans[nums.length-1] = 1;
  for (i=nums.length-2; i>=0; i--) {
    n = nums[i];
    count = 1;
    for (j=i+1; j<nums.length; j++) {
      if (nums[j] > n) {
        count = Math.max(ans[j]+1, count);
      }
    }
    ans[i] = count;
    max = Math.max(max, count);
  }

  return max;
};
