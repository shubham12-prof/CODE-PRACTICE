/*
  7.1 EVENT LOOP - Predict Output

  GOLDEN RULE:
  Run ALL sync code first -> then empty the ENTIRE microtask queue
  (Promise.then, async/await) -> then run ONE macrotask (setTimeout) ->
  empty microtasks again -> repeat.

  call stack -> microtasks (fully empty) -> one macrotask -> repeat
*/

console.log("1: start");

setTimeout(() => {
  console.log("2: setTimeout callback (macrotask)");
}, 0);

Promise.resolve().then(() => {
  console.log("3: promise.then (microtask)");
});

console.log("4: end");

/*
  EXPECTED OUTPUT:
    1: start
    4: end
    3: promise.then (microtask)
    2: setTimeout callback (macrotask)

  WHY:
  - "1" and "4" are plain sync lines, they always run first, top to bottom.
  - setTimeout and .then() don't run immediately - they just get scheduled.
  - After sync code finishes, microtasks (Promise.then) run before
    macrotasks (setTimeout) - even if the timer is 0ms.
*/
