/*
  7.3 EVENT LOOP - setTimeout Ordering

  KEY POINTS:
  1. setTimeout(fn, 0) still waits for sync code + all microtasks first.
  2. Smaller delay generally runs before a larger delay.
  3. Same delay -> runs in the order they were written.
*/

console.log("1: start");

setTimeout(() => console.log("2: timeout 100ms"), 100);
setTimeout(() => console.log("3: timeout 0ms"), 0);
setTimeout(() => console.log("4: timeout 50ms"), 50);

console.log("5: end");

/*
  EXPECTED OUTPUT:
    1: start
    5: end
    3: timeout 0ms
    4: timeout 50ms
    2: timeout 100ms

  WHY: Sync code always finishes first (1, 5). Then timers fire in order
  of delay: 0ms -> 50ms -> 100ms, no matter the order they were written in.
*/


// -----------------------------------------------------------------
// Trickier one: setTimeout mixed with a Promise
// -----------------------------------------------------------------

console.log("--- second example ---");

setTimeout(() => console.log("timeout callback"), 0);

Promise.resolve().then(() => console.log("promise callback"));

console.log("sync line");

/*
  EXPECTED OUTPUT:
    --- second example ---
    sync line
    promise callback
    timeout callback

  WHY: same golden rule - sync first, then ALL microtasks (Promise),
  then macrotasks (setTimeout) - no matter how small the delay is.
*/
