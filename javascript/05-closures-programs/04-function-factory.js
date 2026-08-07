// PROGRAM 4: Function Factory using Closure
// -------------------------------------
// A "function factory" is a function that creates and returns
// other functions, each customized with different starting data.
// The returned functions "remember" the value they were made with.

function createMultiplier(multiplyBy) {
  // this returned function remembers "multiplyBy" forever
  return function (num) {
    return num * multiplyBy;
  };
}

// ---------------- Example usage ----------------
const double = createMultiplier(2);
const triple = createMultiplier(3);
const times10 = createMultiplier(10);

console.log(double(5)); // 10
console.log(triple(5)); // 15
console.log(times10(5)); // 50

// each function keeps its own "multiplyBy" value separately

// Another example: a greeting factory
function createGreeter(greeting) {
  return function (name) {
    return greeting + ", " + name + "!";
  };
}

const sayHello = createGreeter("Hello");
const sayNamaste = createGreeter("Namaste");

console.log(sayHello("Alice")); // Hello, Alice!
console.log(sayNamaste("Bob")); // Namaste, Bob!

module.exports = { createMultiplier, createGreeter };
