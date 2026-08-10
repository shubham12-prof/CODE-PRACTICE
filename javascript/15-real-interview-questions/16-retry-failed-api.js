/*
  15. Real Interview Questions
  Retry Failed API Call

  PROBLEM: given a function that returns a Promise (e.g. an API call
  that might fail), automatically RETRY it a certain number of times
  if it fails, before finally giving up and rejecting.

  CORE IDEA: wrap the API call in a recursive async function. If it
  fails (throws/rejects), catch the error, check if we have retries
  left, and if so, try again (usually after a short delay).
*/

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function retryAPI(apiCallFn, retries = 3, delayMs = 1000) {
  try {
    // Attempt the actual API call.
    return await apiCallFn();
  } catch (error) {
    if (retries <= 0) {
      // No attempts left - give up and let the error propagate.
      throw error;
    }

    console.log(`Attempt failed. Retrying... (${retries} retries left)`);
    await sleep(delayMs); // wait a bit before trying again

    // RECURSIVE CASE: try again, with one fewer retry remaining.
    return retryAPI(apiCallFn, retries - 1, delayMs);
  }
}

// -----------------------------------------------------------------
// Example usage - simulating a flaky API that fails the first 2 times
// -----------------------------------------------------------------
let attemptCount = 0;

function flakyAPICall() {
  attemptCount++;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (attemptCount < 3) {
        reject(new Error(`Attempt ${attemptCount} failed`));
      } else {
        resolve("Success! Data loaded.");
      }
    }, 200);
  });
}

retryAPI(flakyAPICall, 3, 500)
  .then((result) => console.log(result))   // "Success! Data loaded."
  .catch((error) => console.log("All retries exhausted:", error.message));

/*
  WALKTHROUGH:
  Attempt 1: fails ("Attempt 1 failed"). retries=3>0, wait 500ms, retry.
  Attempt 2: fails ("Attempt 2 failed"). retries=2>0, wait 500ms, retry.
  Attempt 3: succeeds! Returns "Success! Data loaded." ✅

  BONUS - exponential backoff (a common follow-up ask): instead of a
  FIXED delay every time, double the delay after each failure, so we
  don't hammer a struggling server too fast:
*/
async function retryWithBackoff(apiCallFn, retries = 3, delayMs = 500) {
  try {
    return await apiCallFn();
  } catch (error) {
    if (retries <= 0) throw error;
    await sleep(delayMs);
    // Double the delay each time: 500ms -> 1000ms -> 2000ms -> ...
    return retryWithBackoff(apiCallFn, retries - 1, delayMs * 2);
  }
}
