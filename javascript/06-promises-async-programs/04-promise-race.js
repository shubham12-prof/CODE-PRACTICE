// PROGRAM 4: Promise.race
// -------------------------------------
// Promise.race returns the result of whichever promise finishes
// FIRST (whether it succeeds or fails). It doesn't wait for the
// others. Common use case: setting a timeout for a slow request.

function slowRequest() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve("Slow request finished");
    }, 3000);
  });
}

function fastRequest() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve("Fast request finished");
    }, 1000);
  });
}

// ---------------- Example usage ----------------
Promise.race([slowRequest(), fastRequest()]).then(function (result) {
  console.log("Winner:", result);
  // Output: "Winner: Fast request finished" (because it's quicker)
});

// Common real-world pattern: race a request against a timeout
function requestWithTimeout(promise, timeoutMs) {
  const timeoutPromise = new Promise(function (resolve, reject) {
    setTimeout(function () {
      reject("Request timed out!");
    }, timeoutMs);
  });

  return Promise.race([promise, timeoutPromise]);
}

requestWithTimeout(slowRequest(), 1500)
  .then(function (result) {
    console.log(result);
  })
  .catch(function (error) {
    console.log("Error:", error); // "Request timed out!" because slowRequest takes 3s
  });

module.exports = { slowRequest, fastRequest, requestWithTimeout };
