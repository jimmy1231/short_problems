/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
  let L = [1], R = [1];
  let i;
  for (i=1; i<nums.length; i++) {
    L.push(L[i-1]*nums[i-1]);
  }

  let j;
  for (i=nums.length-2, j=1; i>=0; i--, j++) {
    R.push(R[j-1]*nums[i+1]);
  }
  R.reverse();

  let output = [];
  for (i=0; i<nums.length; i++) {
    output.push(L[i]*R[i]);
  }

  return output;
};
