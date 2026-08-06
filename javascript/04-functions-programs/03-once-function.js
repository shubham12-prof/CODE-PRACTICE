// PROGRAM 3: Once Function
// -------------------------------------
// "once" wraps a function so it can only run one time.
// If you call it again after that, it just returns the same
// result as the first call, without running the function again.
// Common use case: initialization code, "submit" button handlers.

function once(func) {
  let hasRun = false;
  let result;

  return function (...args) {
    if (!hasRun) {
      result = func(...args);
      hasRun = true;
    }
    return result;
  };
}

// ---------------- Example usage ----------------
function initializeApp() {
  console.log("App initialized!");
  return "done";
}

const initOnce = once(initializeApp);

initOnce(); // prints "App initialized!"
initOnce(); // does nothing, just returns "done" again
initOnce(); // does nothing, just returns "done" again

module.exports = { once };
