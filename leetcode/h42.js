const MIN = (c1, c2) => c1 < c2 ? c1 : c2;
const MAX = (c1, c2) => c1 > c2 ? c1 : c2;

/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
  let trapped = 0;
  let TR = [0]; /* tallest to the right */
  let i, j;
  for (i=height.length-2, j=1; i>=0; i--, j++) {
    TR.push(MAX(TR[j-1], height[i+1]));
  }
  TR.reverse();

  let _l = 0, acc = 0;
  let _h = height[0], _tr = TR[0];
  let _hl = _h > _tr ? _tr : _h;

  for (i=1; i<height.length; i++) {
    _h = height[i], _tr = TR[i];
    if (_h >= _hl) {
      trapped+=(MIN(_h, _hl)*(i-_l-1) - acc);
      _l = i;
      _hl = _h > _tr ? _tr : _h;
      acc = 0;
    } else {
      acc+=_h;
    }
  }

  return trapped;
};
