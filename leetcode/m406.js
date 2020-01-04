/**
 * @param {number[][]} people
 * @return {number[][]}
 */
var reconstructQueue = function(people) {
  people.sort((s1, s2) => {
    let s1_0 = s1[0], s2_0 = s2[0];
    if (s1_0 === s2_0) {
      return s1[1]-s2[1];
    } else {
      return s2_0-s1_0;
    }
  });

  let ans = [];
  people.forEach(p => {
    ans.splice(p[1], 0, p);
  });
  return ans;
};
