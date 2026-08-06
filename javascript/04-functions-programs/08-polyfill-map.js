// PROGRAM 8: Polyfill for Array.map()
// -------------------------------------
// A polyfill means writing our own version of a built-in method,
// to understand how it works internally.
// map() creates a NEW array by running a function on every item.

Array.prototype.myMap = function (callback) {
  let result = [];

  for (let i = 0; i < this.length; i++) {
    // callback gets (currentValue, index, originalArray) just like real map
    result.push(callback(this[i], i, this));
  }

  return result;
};

// ---------------- Example usage ----------------
const numbers = [1, 2, 3, 4];

const doubled = numbers.myMap(function (num) {
  return num * 2;
});

console.log("Doubled:", doubled);
// Output: [ 2, 4, 6, 8 ]

module.exports = {};
