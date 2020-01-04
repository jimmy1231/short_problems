function recurse(coins, idx, amount) {
  console.log('start', coins, coins[idx], amount);
  if (idx >= coins.length) {
    console.log('base case');
    return -1;
  }

  let i, min = Infinity, count;
  for (i=idx; i<coins.length; i++) {
    let d = coins[i];
    let r = amount, count = 0;

    r-=d;
    while (r > 0) {
      count++;
      r-=d;
    }

    /* Success */
    if (r === 0) {
      count++;
      console.log('found!. d | count', d, count);
    } else {
      r+=d;
      let result, found = false;
      while (r <= amount) {
        console.log('recurse', coins, coins[idx+1], r);
        result = recurse(coins, idx+1, r);
        console.log('recurse result:', result);
        if (result > 0) {
          console.log('found! d | count', d, count+result);
          count+=result;
          found = true;
          break;
        }
        count--;
        r+=d;
      }
      count = found ? count : -1;
    }

    if (count !== -1) {
      min = Math.min(min, count);
    }
  }

  console.log('returning:', min);
  return min === Infinity ? -1 : min;
}

let memoize = {};
function subproblem(coins, amount) {
  if (amount === 0) return 0;
  if (amount < 0) return -1;
  if (memoize.hasOwnProperty(amount)) {
    return memoize[amount];
  }

  let i, min = Infinity, res;
  for (i=0; i<coins.length; i++) {
    res = subproblem(coins, amount-coins[i]);
    if (res >= 0) {
      min = Math.min(res+1, min);
    }
  }

  min = min === Infinity ? -1 : min;
  memoize[amount] = min;
  return min;
}

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
  memoize = {}; /* reset */
  coins.sort((c1, c2) => c2-c1);
  if (amount === 0) return 0; /* edge case */

  return subproblem(coins, amount);
  /* Go with greedy algorithm - proof by contradiction */
};
