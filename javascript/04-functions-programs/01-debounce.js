// PROGRAM 1: Debounce
// -------------------------------------
// Debounce makes sure a function only runs AFTER the user has
// stopped calling it for a certain amount of time.
// Common use case: search box - wait until the user stops typing
// before making an API call.

function debounce(func, delay) {
  let timerId;

  return function (...args) {
    // every time the function is called, cancel the previous timer
    clearTimeout(timerId);

    // start a new timer. func only runs if no new call happens
    // before the delay is over
    timerId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

// ---------------- Example usage ----------------
function search(query) {
  console.log("Searching for:", query);
}

const debouncedSearch = debounce(search, 500);

// simulate fast typing - only the last call will actually run
debouncedSearch("h");
debouncedSearch("he");
debouncedSearch("hel");
debouncedSearch("hello");
// after 500ms of no more calls, it will print: Searching for: hello

module.exports = { debounce };
