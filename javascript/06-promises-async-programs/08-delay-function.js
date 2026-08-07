// PROGRAM 8: Delay Function
// -------------------------------------
// A delay function returns a promise that resolves after a set
// amount of time, and passes along whatever value you give it.
// Useful for testing, or spacing out actions.

function delay(value, milliseconds) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(value);
    }, milliseconds);
  });
}

// ---------------- Example usage ----------------
console.log("Start:", new Date().toLocaleTimeString());

delay("Hello after 2 seconds", 2000).then(function (result) {
  console.log(result, "-", new Date().toLocaleTimeString());
});

module.exports = { delay };
