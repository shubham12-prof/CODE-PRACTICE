/*
  15. Real Interview Questions
  Implement throttle()

  PROBLEM: create a function that runs a callback AT MOST once every
  X milliseconds, no matter how many times it's called. Unlike
  debounce (which waits for a pause), throttle guarantees REGULAR
  execution at a fixed rate. Classic use case: a scroll handler that
  shouldn't fire hundreds of times per second.

  CORE IDEA: track whether we're currently "on cooldown". If not, run
  the function immediately and start a cooldown timer. Any calls that
  happen DURING the cooldown are ignored (in this simple version).
*/

function throttle(fn, delay) {
  let isOnCooldown = false;

  return function (...args) {
    const context = this;

    if (isOnCooldown) {
      // Still within the cooldown window - ignore this call entirely.
      return;
    }

    // Run immediately, then start the cooldown.
    fn.apply(context, args);
    isOnCooldown = true;

    setTimeout(() => {
      isOnCooldown = false; // cooldown over, next call can run again
    }, delay);
  };
}

// -----------------------------------------------------------------
// Example usage
// -----------------------------------------------------------------
function logScrollPosition() {
  console.log("Scroll event handled at", Date.now());
}

const throttledScroll = throttle(logScrollPosition, 1000);

// Imagine this being called 50 times per second while scrolling -
// throttledScroll will only actually run logScrollPosition once every
// 1000ms, no matter how often it's called.
window.addEventListener?.("scroll", throttledScroll);

/*
  DEBOUNCE vs THROTTLE - the classic interview question:
  - DEBOUNCE: waits for a PAUSE in calls, then runs ONCE. Good for
    "wait until the user stops doing X" (e.g. search input).
  - THROTTLE: runs at a steady, LIMITED RATE no matter how often it's
    called. Good for "don't let this run more than once every X ms"
    (e.g. scroll, resize, mouse-move handlers).

  REAL-WORLD USES: scroll listeners, window resize, button click
  spam-prevention, drag events, live game input handling.
*/
