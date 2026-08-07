// PROGRAM 1: Create a Promise
// -------------------------------------
// A Promise represents a value that will be available LATER
// (like after an API call finishes). It can end up in one of
// two states: "resolved" (success) or "rejected" (failure).

function createPromiseExample(shouldSucceed) {
  return new Promise(function (resolve, reject) {
    // simulate something that takes time, like an API call
    setTimeout(function () {
      if (shouldSucceed) {
        resolve("Task completed successfully!");
      } else {
        reject("Task failed!");
      }
    }, 1000);
  });
}

// ---------------- Example usage ----------------
const myPromise = createPromiseExample(true);

myPromise
  .then(function (result) {
    console.log("Success:", result);
  })
  .catch(function (error) {
    console.log("Error:", error);
  });

module.exports = { createPromiseExample };
