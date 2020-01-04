let results = {};

function recurse(candidates, target, depth) {
  if (candidates.length === 0) {
    return [];
  }

  let cand, diff, subcandidates;
  let ans = [], _ans, r, r_str;
  let i;
  for (i=0; i<candidates.length; i++) {
    _ans = [];
    cand = candidates[i];
    subcandidates = candidates.slice();
    subcandidates.splice(i, 1);
    diff = target-cand;

    while (diff > 0) {
      _ans.push(cand);
      recurse(subcandidates, diff, depth+1).forEach(a => {
        r = [..._ans, ...a];
        if (depth === 0) {
          r.sort();
          r_str = r.toString();
          if (!results.hasOwnProperty(r_str)) {
            results[r_str] = r;
            ans.push(r);
          }
        } else {
          ans.push(r);
        }
      });
      diff-=cand;
    }
    if (diff === 0) {
      _ans.push(cand);
      ans.push(_ans);
    }
  }

  return ans;
}

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
  results = {};
  return recurse(candidates, target, 0);
};
