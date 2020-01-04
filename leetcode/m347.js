/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
  let ds = {};
  /* O(n) */
  nums.forEach(n => {
    if (ds[n]) {
      ds[n]++;
    } else {
      ds[n] = 1;
    }
  });

  /* O(n) */
  let _ds = [];
  for (let [k, v] of Object.entries(ds)) {
    _ds.push({k, v});
  }

  /* O(nlog(n)) */
  _ds.sort((c1, c2) => c2.v-c1.v);

  /* O(n) */
  return _ds.slice(0, k).map(({k, v}) => k);
};
