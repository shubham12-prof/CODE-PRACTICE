// PROGRAM 9: Polyfill for Array.filter()
// -------------------------------------
// filter() creates a NEW array containing only the items that
// pass a given test (the callback returns true for them).

Array.prototype.myFilter = function (callback) {
  let result = [];

  for (let i = 0; i < this.length; i++) {
    // only keep the item if callback returns true
    if (callback(this[i], i, this)) {
      result.push(this[i]);
    }
  }

  return result;
};

// ---------------- Example usage ----------------
const numbers = [1, 2, 3, 4, 5, 6];

const evenNumbers = numbers.myFilter(function (num) {
  return num % 2 === 0;
});

console.log("Even numbers:", evenNumbers);
// Output: [ 2, 4, 6 ]

module.exports = {};
