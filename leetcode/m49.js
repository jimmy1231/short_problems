/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
  let ds = {};

  let sortedStr;
  strs.forEach(str => {
    sortedStr = str.split('').sort((c1, c2) =>
      c1.localeCompare(c2)
    ).join('');

    if (!ds.hasOwnProperty(sortedStr)) {
      ds[sortedStr] = [str];
    } else {
      ds[sortedStr].push(str);
    }
  });

  return Object.values(ds);
};
