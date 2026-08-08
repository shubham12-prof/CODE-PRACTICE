/*
  7.2 EVENT LOOP - Microtask vs Macrotask

  MICROTASKS (higher priority, queue is fully emptied every time):
    - Promise.then / .catch / .finally
    - async/await (code after await = basically a .then callback)
    - queueMicrotask()

  MACROTASKS (lower priority, run ONE at a time):
    - setTimeout / setInterval
    - setImmediate (Node.js)
    - I/O callbacks, UI rendering (browser)
*/

console.log("A: sync code");

setTimeout(() => console.log("B: macrotask 1"), 0);

Promise.resolve()
  .then(() => console.log("C: microtask 1"))
  .then(() => console.log("D: microtask 2 (chained)"));

setTimeout(() => console.log("E: macrotask 2"), 0);

console.log("F: sync code");

/*
  EXPECTED OUTPUT:
    A: sync code
    F: sync code
    C: microtask 1
    D: microtask 2 (chained)
    B: macrotask 1
    E: macrotask 2

  WHY: Sync code runs first (A, F). Then ALL microtasks run - even
  chained ones (C then D) - before touching any setTimeout, because
  each .then() creates a new microtask and the queue is drained until
  truly empty. Only then does JS move to macrotasks, in order (B, E).
*/
