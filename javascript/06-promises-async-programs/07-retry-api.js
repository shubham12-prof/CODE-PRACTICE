// PROGRAM 7: Retry API Call
// -------------------------------------
// Sometimes an API call fails randomly (network issue, server
// busy, etc). Instead of giving up right away, we try again a
// few times before finally reporting failure.

function unreliableApiCall() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      // simulate a call that fails most of the time (70% chance of failure)
      const success = Math.random() > 0.7;

      if (success) {
        resolve("API call succeeded!");
      } else {
        reject("API call failed!");
      }
    }, 500);
  });
}

async function retryApiCall(apiFunction, maxRetries) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log("Attempt", attempt);
      const result = await apiFunction();
      return result; // success - stop retrying
    } catch (error) {
      console.log("Attempt", attempt, "failed:", error);

      // if this was the last allowed attempt, give up and throw
      if (attempt === maxRetries) {
        throw new Error("All " + maxRetries + " attempts failed");
      }
    }
  }
}

// ---------------- Example usage ----------------
retryApiCall(unreliableApiCall, 5)
  .then(function (result) {
    console.log("Final result:", result);
  })
  .catch(function (error) {
    console.log("Giving up:", error.message);
  });

module.exports = { retryApiCall, unreliableApiCall };
