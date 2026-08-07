// PROGRAM 3: Create a Calculator using Closure
// -------------------------------------
// We keep a running "result" value hidden inside the closure,
// and give the outside world a set of functions to operate on it.

function createCalculator() {
  let result = 0; // private running total

  return {
    add: function (num) {
      result = result + num;
      return this; // returning "this" lets us chain calls together
    },
    subtract: function (num) {
      result = result - num;
      return this;
    },
    multiply: function (num) {
      result = result * num;
      return this;
    },
    divide: function (num) {
      result = result / num;
      return this;
    },
    getResult: function () {
      return result;
    },
    reset: function () {
      result = 0;
      return this;
    },
  };
}

// ---------------- Example usage ----------------
const calc = createCalculator();

calc.add(10).subtract(2).multiply(3); // chained calls
console.log("Result:", calc.getResult()); // (10 - 2) * 3 = 24

calc.reset();
console.log("After reset:", calc.getResult()); // 0

module.exports = { createCalculator };
