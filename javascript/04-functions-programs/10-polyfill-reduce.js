// PROGRAM 10: Polyfill for Array.reduce()
// -------------------------------------
// reduce() goes through the array and combines everything into
// a single value (a sum, a total, an object, anything you want).

Array.prototype.myReduce = function (callback, initialValue) {
  let accumulator = initialValue;
  let startIndex = 0;

  // if no initial value was given, use the first array item as the start
  if (accumulator === undefined) {
    accumulator = this[0];
    startIndex = 1;
  }

  for (let i = startIndex; i < this.length; i++) {
    accumulator = callback(accumulator, this[i], i, this);
  }

  return accumulator;
};

// ---------------- Example usage ----------------
const numbers = [1, 2, 3, 4];

const sum = numbers.myReduce(function (total, current) {
  return total + current;
}, 0);

console.log("Sum:", sum);
// Output: 10

module.exports = {};
