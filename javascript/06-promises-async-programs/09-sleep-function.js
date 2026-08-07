// PROGRAM 9: Sleep Function
// -------------------------------------
// "sleep" is like "delay" but it doesn't return any value -
// it's just used with "await" to pause code for a bit before
// moving on to the next line, similar to sleep() in other languages.

function sleep(milliseconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, milliseconds);
  });
}

// ---------------- Example usage ----------------
async function runSteps() {
  console.log("Step 1 -", new Date().toLocaleTimeString());

  await sleep(1000); // pause for 1 second
  console.log("Step 2 -", new Date().toLocaleTimeString());

  await sleep(1000); // pause for another 1 second
  console.log("Step 3 -", new Date().toLocaleTimeString());
}

runSteps();

module.exports = { sleep };
