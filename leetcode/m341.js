/**
 * // This is the interface that allows for creating nested lists.
 * // You should not implement it, or speculate about its implementation
 * function NestedInteger() {
 *
 *     Return true if this NestedInteger holds a single integer, rather than a nested list.
 *     @return {boolean}
 *     this.isInteger = function() {
 *         ...
 *     };
 *
 *     Return the single integer that this NestedInteger holds, if it holds a single integer
 *     Return null if this NestedInteger holds a nested list
 *     @return {integer}
 *     this.getInteger = function() {
 *         ...
 *     };
 *
 *     Return the nested list that this NestedInteger holds, if it holds a nested list
 *     Return null if this NestedInteger holds a single integer
 *     @return {NestedInteger[]}
 *     this.getList = function() {
 *         ...
 *     };
 * };
 */
/**
 * @constructor
 * @param {NestedInteger[]} nestedList
 */
var NestedIterator = function(nestedList) {
  const recurseList = elem => {
    // console.log('recurseList:', elem.isInteger());
    // base case
    if (elem.isInteger()) {
      return elem.getInteger();
    }

    let _list = elem.getList();
    let _result = [];
    _list.forEach(e => {
      // console.log('recursing', e.isInteger());
      if (e.isInteger()) {
        _result.push(e.getInteger());
      } else {
        _result.push(...recurseList(e));
      }
    });

    // console.log('result:', _result);
    return _result;
  };

  this._list = [];
  nestedList.forEach(elem => {
    // console.log('new elem: ', elem.isInteger());
    let ret = recurseList(elem);
    if (typeof ret === 'number') {
      this._list.push(ret);
    } else {
      this._list.push(...ret);
    }
  });
  this._idx = 0;
  this._size = this._list.length;
};


/**
 * @this NestedIterator
 * @returns {boolean}
 */
NestedIterator.prototype.hasNext = function() {
  return this._idx < this._size;
};

/**
 * @this NestedIterator
 * @returns {integer}
 */
NestedIterator.prototype.next = function() {
  let elem = this._list[this._idx];
  this._idx++;
  return elem;
};

/**
 * Your NestedIterator will be called like this:
 * var i = new NestedIterator(nestedList), a = [];
 * while (i.hasNext()) a.push(i.next());
 */
