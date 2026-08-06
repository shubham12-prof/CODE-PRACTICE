// PROGRAM 5: Currying
// -------------------------------------
// Currying turns a function that takes multiple arguments into
// a chain of functions that each take one argument at a time.
// Example: add(1, 2, 3) becomes add(1)(2)(3)

function curry(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}

// ---------------- Example usage ----------------
console.log(curry(1)(2)(3)); // 6

// You can also stop halfway and reuse a partially filled function
const addOne = curry(1);
const addOneAndTwo = addOne(2);
console.log(addOneAndTwo(3)); // 6
console.log(addOneAndTwo(10)); // 13

module.exports = { curry };
