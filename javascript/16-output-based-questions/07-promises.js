/*
  16. Output-Based Questions
  Promises

  KEY POINTS TO REMEMBER:
  - The executor function inside new Promise(...) runs SYNCHRONOUSLY.
  - .then()/.catch()/.finally() callbacks are always ASYNC (microtasks).
  - Once a promise is resolved or rejected, its state is LOCKED - it
    can never change again, no matter how many times you try.
  - A .catch() only catches errors from BEFORE it in the chain, not after.
*/

// -----------------------------------------------------------------
// Example 1: executor runs sync, .then() runs async
// -----------------------------------------------------------------
console.log("1");

const p = new Promise((resolve) => {
  console.log("2"); // runs immediately, synchronously
  resolve("done");
});

p.then((val) => console.log("3:", val)); // always async, even if
                                          // already resolved

console.log("4");

/*
  EXPECTED OUTPUT: 1, 2, 4, 3: done
*/


// -----------------------------------------------------------------
// Example 2: promise state is locked after settling
// -----------------------------------------------------------------
const p2 = new Promise((resolve, reject) => {
  resolve("first");
  reject("second"); // this is IGNORED - promise is already resolved
  resolve("third"); // this is IGNORED too
});

p2.then((val) => console.log(val)).catch((err) => console.log(err));
// EXPECTED OUTPUT: "first"  (only the FIRST resolve/reject call counts)


// -----------------------------------------------------------------
// Example 3: chaining .then() - each one gets the PREVIOUS one's
// return value
// -----------------------------------------------------------------
Promise.resolve(1)
  .then((val) => {
    console.log("got:", val); // got: 1
    return val + 1;
  })
  .then((val) => {
    console.log("got:", val); // got: 2
    return val + 1;
  })
  .then((val) => {
    console.log("got:", val); // got: 3
  });


// -----------------------------------------------------------------
// Example 4: catch() only catches errors from BEFORE it
// -----------------------------------------------------------------
Promise.resolve()
  .then(() => {
    throw new Error("Oops!");
  })
  .catch((err) => {
    console.log("Caught:", err.message); // Caught: Oops!
    return "recovered";
  })
  .then((val) => {
    console.log("After catch:", val); // After catch: recovered
    // Since catch() "handled" the error and returned a normal value,
    // the chain CONTINUES normally from here - it's no longer in an
    // error state.
  });


// -----------------------------------------------------------------
// Example 5: an error thrown AFTER a catch() is NOT caught by that
// same catch() - you'd need another .catch() further down the chain
// -----------------------------------------------------------------
Promise.resolve()
  .then(() => {
    throw new Error("First error");
  })
  .catch((err) => console.log("Caught first:", err.message))
  .then(() => {
    throw new Error("Second error"); // this happens AFTER the catch above
  })
  .catch((err) => console.log("Caught second:", err.message));
// EXPECTED OUTPUT: "Caught first: First error" then "Caught second: Second error"
