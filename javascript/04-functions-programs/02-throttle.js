// PROGRAM 2: Throttle
// -------------------------------------
// Throttle makes sure a function runs at most once every X
// milliseconds, no matter how many times it's called.
// Common use case: scroll events, resize events, button clicks.

function throttle(func, delay) {
  let isWaiting = false;

  return function (...args) {
    // if we're still "cooling down", ignore this call
    if (isWaiting) {
      return;
    }

    // run the function right away
    func(...args);
    isWaiting = true;

    // after "delay" ms, allow the function to run again
    setTimeout(() => {
      isWaiting = false;
    }, delay);
  };
}

// ---------------- Example usage ----------------
function logScroll() {
  console.log("Scroll event handled at", new Date().toLocaleTimeString());
}

const throttledScroll = throttle(logScroll, 1000);

// simulate many scroll events happening quickly
throttledScroll(); // runs immediately
throttledScroll(); // ignored (too soon)
throttledScroll(); // ignored (too soon)
// only one call actually runs until 1000ms have passed

module.exports = { throttle };
