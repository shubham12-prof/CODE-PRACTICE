// PROGRAM 5: Promise.allSettled
// -------------------------------------
// Promise.allSettled waits for ALL promises to finish, no matter
// if they succeed or fail. It never stops early - it just tells
// you the outcome ("fulfilled" or "rejected") for every single one.

function taskThatSucceeds() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve("Task A succeeded");
    }, 500);
  });
}

function taskThatFails() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      reject("Task B failed");
    }, 700);
  });
}

// ---------------- Example usage ----------------
Promise.allSettled([taskThatSucceeds(), taskThatFails()]).then(function (
  results
) {
  results.forEach(function (result, index) {
    if (result.status === "fulfilled") {
      console.log("Task", index, "succeeded with value:", result.value);
    } else {
      console.log("Task", index, "failed with reason:", result.reason);
    }
  });
});
/* Output:
Task 0 succeeded with value: Task A succeeded
Task 1 failed with reason: Task B failed
*/

module.exports = { taskThatSucceeds, taskThatFails };
