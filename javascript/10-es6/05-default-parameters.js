/*
  10.5 ES6+ - Default Parameters

  CORE IDEA: give a function parameter a fallback value that's used
  automatically if the caller doesn't pass an argument for it (or
  passes "undefined").
*/

// -----------------------------------------------------------------
// Basic default parameter
// -----------------------------------------------------------------
function greet(name = "Guest") {
  console.log(`Hello, ${name}!`);
}

greet("Neha"); // Hello, Neha!
greet();       // Hello, Guest!   (no argument passed -> default used)
greet(undefined); // Hello, Guest! (undefined also triggers the default)
greet(null);   // Hello, null!    (null is NOT the same as undefined - default is skipped)


// -----------------------------------------------------------------
// Multiple default parameters
// -----------------------------------------------------------------
function createUser(name = "Anonymous", role = "user", isActive = true) {
  return { name, role, isActive };
}

console.log(createUser());                     // { name: 'Anonymous', role: 'user', isActive: true }
console.log(createUser("Dev"));                 // { name: 'Dev', role: 'user', isActive: true }
console.log(createUser("Dev", "admin"));        // { name: 'Dev', role: 'admin', isActive: true }


// -----------------------------------------------------------------
// Default parameters can use earlier parameters in their calculation
// -----------------------------------------------------------------
function calculateTotal(price, quantity = 1, total = price * quantity) {
  return total;
}

console.log(calculateTotal(100));      // 100  (quantity defaults to 1, total = 100*1)
console.log(calculateTotal(100, 3));   // 300  (total = 100*3)


// -----------------------------------------------------------------
// Common real-world use: default values in a config/options object
// -----------------------------------------------------------------
function fetchData(url, { method = "GET", timeout = 5000 } = {}) {
  // The "= {}" at the end handles the case where NO second argument
  // is passed at all - without it, destructuring "undefined" would
  // throw an error.
  console.log(`${method} request to ${url}, timeout: ${timeout}ms`);
}

fetchData("/api/users");                          // GET request to /api/users, timeout: 5000ms
fetchData("/api/users", { method: "POST" });       // POST request to /api/users, timeout: 5000ms

/*
  WHY THIS MATTERS: before ES6, developers had to write manual checks
  like:
    function greet(name) {
      name = name || "Guest";
      ...
    }
  Default parameters make this cleaner and handle it directly in the
  function signature.
*/
