const ARR_NO_IDX = (arr, idx) => {
  let _cpy = arr.slice(0);
  _cpy.splice(idx, 1);
  return _cpy;
}

function subproblem(arr) {
  if (arr.length === 1) return [arr];

  let ans = [];

  let i, _result;
  for (i=0; i<arr.length; i++) {
    _result = subproblem(ARR_NO_IDX(arr, i));
    _result.forEach(_r => {
      _r.splice(0, 0, arr[i]);
      ans.push(_r);
    });
  }

  return ans;
}

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
  return subproblem(nums);
};
