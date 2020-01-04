const MIN = (s1, s2) => s1 <= s2 ? s1 : s2;

function brute(height) {
  let max = 0;
  let len = height.length;

  let lower, upper, _area;
  let i;
  for (i=0; i<len; i++) {
    lower = height[i];
    for (j=i+1; j<len; j++) {
      upper = height[j];
      _area = MIN(lower, upper)*(j-i);
      if (_area > max) {
        max = _area;
      }
    }
  }

  return max;
}

function optimal(h) {
  let l = 0, r = h.length-1;

  let max = 0;
  let lower, upper, _area;
  while (l !== r) {
    lower = h[l]; upper = h[r];
    _area = MIN(lower, upper)*(r-l);
    if (_area > max) max = _area;

    if (lower > upper) r--;
    else l++;
  }

  return max;
}

/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
  return optimal(height);
};
