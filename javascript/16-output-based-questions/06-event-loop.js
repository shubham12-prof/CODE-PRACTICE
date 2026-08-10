/*
  16. Output-Based Questions
  Event Loop

  GOLDEN RULE (covered in depth in the /event-loop folder - these are
  extra practice snippets specifically for predicting output):
  Run ALL sync code first -> then empty the ENTIRE microtask queue
  (Promise.then, async/await) -> then run ONE macrotask (setTimeout) ->
  empty microtasks again -> repeat.
*/

// -----------------------------------------------------------------
// Example 1: mixing console.log, setTimeout, and Promise
// -----------------------------------------------------------------
console.log("1");

setTimeout(() => console.log("2"), 0);

Promise.resolve().then(() => console.log("3"));

console.log("4");

/*
  EXPECTED OUTPUT: 1, 4, 3, 2
  WHY: sync code (1, 4) first, then microtask (3), then macrotask (2).
*/


// -----------------------------------------------------------------
// Example 2: nested promises and setTimeout together
// -----------------------------------------------------------------
console.log("--- example 2 ---");

console.log("A");

setTimeout(() => {
  console.log("B");
  Promise.resolve().then(() => console.log("C"));
}, 0);

Promise.resolve().then(() => {
  console.log("D");
  setTimeout(() => console.log("E"), 0);
});

console.log("F");

/*
  EXPECTED OUTPUT: A, F, D, B, C, E
  WHY:
  - Sync: A, F
  - Microtask queue empties: D runs (schedules a NEW macrotask E inside it)
  - First macrotask (the original setTimeout): B runs, which
    schedules a microtask (C)
  - Microtask queue empties again: C runs
  - Next macrotask: E runs
*/


// -----------------------------------------------------------------
// Example 3: multiple .then() chains vs setTimeout
// -----------------------------------------------------------------
console.log("--- example 3 ---");

setTimeout(() => console.log("timeout"), 0);

Promise.resolve()
  .then(() => console.log("promise 1"))
  .then(() => console.log("promise 2"))
  .then(() => console.log("promise 3"));

console.log("sync");

/*
  EXPECTED OUTPUT: sync, promise 1, promise 2, promise 3, timeout
  WHY: ALL chained .then() calls are microtasks and run before ANY
  macrotask (setTimeout), even though there are 3 of them chained.
*/


// -----------------------------------------------------------------
// Example 4: async/await mixed in
// -----------------------------------------------------------------
console.log("--- example 4 ---");

async function asyncFn() {
  console.log("async start");
  await null;
  console.log("async end");
}

console.log("script start");
asyncFn();
console.log("script end");

/*
  EXPECTED OUTPUT: script start, async start, script end, async end
  WHY: asyncFn() runs sync until "await" (so "async start" logs right
  away). At "await", it pauses and gives control back, so "script end"
  runs next. "async end" only runs after all sync code, as a microtask.
*/
