/*
  15. Real Interview Questions
  Polyfill for Promise.all()

  PROBLEM: implement your own version of Promise.all() - takes an
  array of promises, and returns a NEW promise that:
  - RESOLVES with an array of all results, in the SAME ORDER as the
    input, once EVERY promise has resolved.
  - REJECTS immediately with the first error, if ANY promise rejects.

  CORE IDEA: wrap everything in a "new Promise((resolve, reject) => {...})"
  ourselves. Track how many promises have finished, and only call the
  outer resolve() once ALL of them are done. If any one rejects, call
  the outer reject() right away.
*/

function myPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = new Array(promises.length); // preserves ORDER
    let completedCount = 0;

    if (promises.length === 0) {
      resolve([]); // edge case: empty input resolves immediately
      return;
    }

    promises.forEach((promise, index) => {
      // Promise.resolve() wraps non-promise values too, so this also
      // works if the array contains plain values mixed with promises.
      Promise.resolve(promise)
        .then((value) => {
          results[index] = value; // store at the SAME index as input
          completedCount++;

          // Only resolve the outer promise once EVERYTHING is done.
          if (completedCount === promises.length) {
            resolve(results);
          }
        })
        .catch((error) => {
          // Any single rejection immediately rejects the whole thing -
          // we don't wait for the others.
          reject(error);
        });
    });
  });
}

// -----------------------------------------------------------------
// Example usage
// -----------------------------------------------------------------
const p1 = new Promise((resolve) => setTimeout(() => resolve(1), 300));
const p2 = new Promise((resolve) => setTimeout(() => resolve(2), 100));
const p3 = new Promise((resolve) => setTimeout(() => resolve(3), 200));

myPromiseAll([p1, p2, p3]).then((results) => {
  console.log(results); // [1, 2, 3]  -> ORIGINAL order preserved,
                         // even though p2 finished first (100ms)
});

// Rejection example:
const p4 = new Promise((resolve) => setTimeout(() => resolve("ok"), 100));
const p5 = new Promise((_, reject) => setTimeout(() => reject("failed!"), 50));

myPromiseAll([p4, p5])
  .then((results) => console.log(results))
  .catch((err) => console.log("Error:", err)); // Error: failed!

/*
  WHY results[index] = value (NOT results.push(value)):
  Promises can finish in ANY order (p2 might finish before p1). Using
  the index guarantees the output array matches the INPUT order, not
  the order they happened to complete in.

  TIME COMPLEXITY: O(n) - we attach one .then/.catch per promise.
  This mirrors the real Promise.all behavior.
*/
