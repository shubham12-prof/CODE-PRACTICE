/*
  10.8 ES6+ - Generators

  CORE IDEA: a generator is a special kind of function that can PAUSE
  its execution (using "yield") and RESUME later, instead of running
  start-to-finish in one go like a normal function.

  SYNTAX: written with function* (a star after "function"), and uses
  the "yield" keyword to pause and return a value.
*/

// -----------------------------------------------------------------
// Basic generator
// -----------------------------------------------------------------
function* countUpTo3() {
  console.log("start");
  yield 1; // pauses here, returns 1
  console.log("after first yield");
  yield 2; // pauses here, returns 2
  console.log("after second yield");
  yield 3; // pauses here, returns 3
  console.log("done");
}

// Calling a generator function does NOT run its code yet - it just
// creates a "generator object" that we can control step by step.
const gen = countUpTo3();

// Each .next() call resumes the function until the NEXT yield.
console.log(gen.next()); // logs "start", returns { value: 1, done: false }
console.log(gen.next()); // logs "after first yield", returns { value: 2, done: false }
console.log(gen.next()); // logs "after second yield", returns { value: 3, done: false }
console.log(gen.next()); // logs "done", returns { value: undefined, done: true }


// -----------------------------------------------------------------
// Generators are ITERABLE - you can loop over them directly
// -----------------------------------------------------------------
function* colors() {
  yield "red";
  yield "green";
  yield "blue";
}

for (const color of colors()) {
  console.log(color);
}
// red
// green
// blue


// -----------------------------------------------------------------
// Practical use case: generating an infinite sequence LAZILY
// (only computes the next value when actually asked for it)
// -----------------------------------------------------------------
function* idGenerator() {
  let id = 1;
  while (true) {
    yield id;
    id++;
  }
}

const ids = idGenerator();
console.log(ids.next().value); // 1
console.log(ids.next().value); // 2
console.log(ids.next().value); // 3
// This never actually creates an infinite array in memory - it only
// calculates ONE value at a time, whenever .next() is called. This is
// something a normal function/array could NOT safely do.

/*
  COMMON INTERVIEW POINT: generators are also the foundation that
  async/await is conceptually built on - both let a function "pause"
  and "resume" instead of running all at once. Generators pause on
  yield (manually, via .next()); async/await pauses on "await"
  (automatically, when a Promise resolves).
*/
