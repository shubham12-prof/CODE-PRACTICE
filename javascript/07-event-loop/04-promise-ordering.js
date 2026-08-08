/*
  7.4 EVENT LOOP - Promise Ordering

  KEY POINTS:
  1. The executor function inside `new Promise((resolve) => {...})` runs
     SYNCHRONOUSLY, immediately - only .then() is async.
  2. Chained .then() calls each run as a separate microtask, one after
     another, but still all before any setTimeout.
*/

console.log("1: start");

const promise = new Promise((resolve) => {
  console.log("2: inside executor (runs SYNC, immediately)");
  resolve("done");
});

promise.then((value) => {
  console.log(`3: promise resolved with "${value}" (async - microtask)`);
});

console.log("4: end");

/*
  EXPECTED OUTPUT:
    1: start
    2: inside executor (runs SYNC, immediately)
    4: end
    3: promise resolved with "done" (async - microtask)

  WHY: The executor (step 2) runs the instant `new Promise(...)` is
  called. But `.then()` ALWAYS waits for current sync code to finish,
  even if the promise is already resolved.
*/


// -----------------------------------------------------------------
// Chained .then() ordering
// -----------------------------------------------------------------

console.log("--- chaining example ---");

Promise.resolve(1)
  .then((val) => {
    console.log("A: got", val);
    return val + 1;
  })
  .then((val) => {
    console.log("B: got", val);
    return val + 1;
  })
  .then((val) => {
    console.log("C: got", val);
  });

console.log("D: sync code after chain is set up");

/*
  EXPECTED OUTPUT:
    --- chaining example ---
    D: sync code after chain is set up
    A: got 1
    B: got 2
    C: got 3

  WHY: Setting up the chain doesn't run any callback immediately - it
  just schedules "A" as a microtask. Only after sync code finishes does
  "A" run, which then schedules "B", and so on.
*/
