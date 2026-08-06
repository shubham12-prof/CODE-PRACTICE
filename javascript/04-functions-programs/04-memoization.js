// PROGRAM 4: Memoization
// -------------------------------------
// Memoization saves the result of a function call, so if the
// same input is used again, we return the saved answer instead
// of doing the work again. Great for slow/expensive calculations.

function memoize(func) {
  let cache = {};

  return function (...args) {
    // use the arguments as a key to store/find the cached result
    let key = JSON.stringify(args);

    if (cache[key] !== undefined) {
      console.log("Fetching from cache for:", key);
      return cache[key];
    }

    let result = func(...args);
    cache[key] = result;
    return result;
  };
}

// ---------------- Example usage ----------------
function slowSquare(n) {
  console.log("Calculating square of", n);
  return n * n;
}

const fastSquare = memoize(slowSquare);

console.log(fastSquare(5)); // Calculating square of 5 -> 25
console.log(fastSquare(5)); // Fetching from cache for: [5] -> 25
console.log(fastSquare(6)); // Calculating square of 6 -> 36

module.exports = { memoize };
