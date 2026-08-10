/*
  15. Real Interview Questions
  Implement debounce()

  PROBLEM: create a function that delays running a callback until AFTER
  the user has STOPPED calling it for a certain amount of time. Every
  new call RESETS the timer. Classic use case: a search box that only
  fires an API call once the user stops typing (not on every keystroke).

  CORE IDEA: keep ONE timer. Every time the debounced function is
  called, cancel the previous timer (if any) and start a fresh one.
  The real function only runs if the timer is ever allowed to finish.
*/

function debounce(fn, delay) {
  let timeoutId; // remembers the currently pending timer

  return function (...args) {
    // "this" needs to be preserved in case fn relies on it (e.g. it's
    // a method on an object) - we use a regular function (not an
    // arrow function) here specifically so "this" works correctly.
    const context = this;

    // Cancel whatever timer was pending from the LAST call.
    clearTimeout(timeoutId);

    // Start a new timer. If nothing calls the debounced function again
    // before "delay" ms pass, fn finally runs.
    timeoutId = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}

// -----------------------------------------------------------------
// Example usage
// -----------------------------------------------------------------
function searchAPI(query) {
  console.log("Searching for:", query);
}

const debouncedSearch = debounce(searchAPI, 300);

// Simulate rapid typing - only the LAST call within 300ms actually runs.
debouncedSearch("h");
debouncedSearch("he");
debouncedSearch("hel");
debouncedSearch("hell");
debouncedSearch("hello");
// After 300ms of no more calls, only logs: "Searching for: hello"

/*
  REAL-WORLD USES: search-as-you-type inputs, window resize handlers,
  form validation on keystrokes - anywhere you want to wait for the
  user to "settle" before doing expensive work.

  COMMON FOLLOW-UP: "what's the difference between debounce and
  throttle?" -> see 02-throttle.js in this same folder.
*/
