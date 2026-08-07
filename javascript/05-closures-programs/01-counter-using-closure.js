// PROGRAM 1: Counter using Closure
// -------------------------------------
// A closure means a function "remembers" the variables from the
// place it was created in, even after that outer function has
// finished running. Here, "count" stays alive inside the
// returned function, and only that function can access it.

function createCounter() {
  let count = 0; // this variable is "private" - only reachable from inside

  return function () {
    count = count + 1;
    return count;
  };
}

// ---------------- Example usage ----------------
const counter1 = createCounter();

console.log(counter1()); // 1
console.log(counter1()); // 2
console.log(counter1()); // 3

// each counter created has its OWN separate "count" variable
const counter2 = createCounter();
console.log(counter2()); // 1 (starts fresh, not affected by counter1)

module.exports = { createCounter };
