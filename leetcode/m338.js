const FLP2 = x => {
  if (x === 0) return 0;

  x = x | (x >> 1);
  x = x | (x >> 2);
  x = x | (x >> 4);
  x = x | (x >> 8);
  x = x | (x >> 16);
  return x - (x >> 1);
};

function getBits(n) {
  /* edge case */
  if (n === 0) return 0;

  let nbits = 0;
  /*
   * Get the smallest fitting power of 2
   * Steps:
   * (1) Round n to nearest power of 2 s.t. 2^m > n
   * (2) First fitting power of 2 is 2^(m-1)
   */
  do {
    n -= FLP2(n);
    nbits++;
  } while (n > 0);

  return nbits;
}

/**
 * @param {number} num
 * @return {number[]}
 */
var countBits = function(num) {
  let ans = [];
  let i;
  for (i=0; i<=num; i++) {
    // what divides into i? need a while loop
    ans.push(getBits(i));
  }

  return ans;
};
