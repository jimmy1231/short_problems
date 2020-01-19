/**
 * https://leetcode.com/problems/next-permutation/
 */

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
const SWAP = (arr, ind1, ind2) => [arr[ind1], arr[ind2]] = [arr[ind2], arr[ind1]];

function reverse_sublist(list, s, e) {
  let i=s, j=e;
  while (i < j) {
    SWAP(list, i, j);
    i++;
    j--;
  }
}

var nextPermutation = function(nums) {
  if (nums.length <= 1) return;

  let i = nums.length-1;
  let curr;
  let prev = -Infinity;
  while (i >= 0) {
    curr = nums[i];
    if (curr < prev) {
      break;
    }
    prev = curr;
    i--;
  }
  if (i < 0) {
    reverse_sublist(nums, 0, nums.length-1);
    return;
  }

  // i is the pivot
  let _i, _n, smallest = Infinity, _ind = -Infinity;
  let _p = nums[i];
  for (_i=i+1; _i<nums.length; _i++) {
    _n = nums[_i];
    if (_n > _p) {
      if (_n <= smallest && _i > _ind) {
        smallest = _n;
        _ind = _i;
      }
    }
  }

  SWAP(nums, i, _ind);
  reverse_sublist(nums, i+1, nums.length-1);
};
