/**
 * @param {number[]} T
 * @return {number[]}
 */
var dailyTemperatures = function(T) {
  let ans = [];

  let i, j;
  let curr_t, f_t, found;
  for (i=0; i<T.length; i++) {
    curr_t = T[i];
    for (j=i+1; j<T.length; j++) {
      f_t = T[j];
      if (f_t > curr_t) {
        found = true;
        break;
      }
    }

    if (!found) {
      ans.push(0);
    } else {
      ans.push(j-i);
    }

    found = false;
  }

  return ans;
};
