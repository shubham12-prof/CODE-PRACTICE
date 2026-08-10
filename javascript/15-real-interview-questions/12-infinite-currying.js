/*
  15. Real Interview Questions
  Infinite Currying

  PROBLEM: implement a function add() that can be called with
  arguments ONE AT A TIME, chained indefinitely, like:
    add(1)(2)(3)(4) ... and so on, any number of times.
  At some point you need to get the final sum out - usually by either
  calling it with no arguments, or letting it be used where a number
  is expected (via valueOf/toString).
  Example: add(1)(2)(3) should eventually total 6.

  CORE IDEA: each call to add(x) returns ANOTHER function that "remembers"
  the running total so far (via closure), and can itself be called
  again with the next number - repeating forever.
*/

function add(firstNum) {
  // "sum" is remembered across every future call via closure.
  let sum = firstNum;

  // This inner function is what gets returned - and it returns ANOTHER
  // function just like itself, so the chain can continue indefinitely.
  function innerAdd(nextNum) {
    sum += nextNum;
    return innerAdd; // return itself, allowing another () call to chain on
  }

  // Trick: override valueOf so that when JS needs to treat this
  // function as a NUMBER (like in console.log(add(1)(2)(3) + 0), or
  // simply printing it in some contexts), it automatically returns
  // "sum" instead of the function itself.
  innerAdd.valueOf = () => sum;

  return innerAdd;
}

// -----------------------------------------------------------------
// Example usage
// -----------------------------------------------------------------
console.log(add(1)(2)(3).valueOf());       // 6
console.log(add(1)(2)(3)(4).valueOf());    // 10
console.log(add(5)(10)(15)(20)(25).valueOf()); // 75

// Because of valueOf, this also works with arithmetic directly:
console.log(add(1)(2)(3) + 0); // 6  (JS calls valueOf() automatically here)

/*
  HOW THE CHAIN ACTUALLY WORKS, step by step for add(1)(2)(3):
  add(1)       -> sum starts at 1, returns innerAdd function A.
  A(2)         -> calling A adds 2 to sum (sum=3), returns itself (A).
  A(3)         -> calling A again adds 3 to sum (sum=6), returns itself (A).
  .valueOf()   -> manually reads the final sum: 6.

  WHY WE NEED valueOf (or a similar trick): without it, add(1)(2)(3)
  would just return a FUNCTION, and console.log would print the
  function's code, not a number. valueOf() tells JS "if you need a
  number version of me, here it is" - which is exactly what
  console.log(x + 0) or similar numeric contexts trigger automatically.

  COMMON INTERVIEW POINT: this is a great example of CLOSURES in
  action - "sum" isn't a global variable, yet every returned function
  in the chain can still read AND update the same "sum" variable,
  because they all share the same enclosing scope from the original
  add() call.
*/
