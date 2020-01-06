function kthDistinct(nums, k) {
  let i, prevLargest, _k;
  for (i=0, _k=0; i<nums.length; i++) {
    if (prevLargest !== nums[i]) {
      prevLargest = nums[i];
      _k++;
      if (_k === k) {
        return prevLargest;
      }
    }
  }
}
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
  nums.sort((c1, c2) => c2-c1); /* nlogn */
  return nums[k-1];
};
