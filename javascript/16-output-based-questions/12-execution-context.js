/*
  16. Output-Based Questions
  Execution Context

  CORE IDEA: an "execution context" is the environment in which JS
  code runs - it holds info about variables, scope, and "this" at that
  moment. There are 2 phases when ANY execution context is created:
  1. CREATION PHASE: hoisting happens here - variable/function
     declarations are registered in memory BEFORE any code actually runs.
  2. EXECUTION PHASE: code runs line by line, assigning real values.

  There are different TYPES of execution context:
  - Global Execution Context (created once, when the script starts)
  - Function Execution Context (created EVERY time a function is called)
  - Eval Execution Context (rare, from eval() - not commonly tested)
*/

// -----------------------------------------------------------------
// Example 1: creation phase explains why hoisting looks the way it does
// -----------------------------------------------------------------
console.log(typeof myVar);  // "undefined" - hoisted in creation phase,
                             // but not yet assigned (that happens later,
                             // in the execution phase)
console.log(typeof myFunc); // "function" - function declarations are
                             // FULLY hoisted, body included

var myVar = "hello";
function myFunc() {}


// -----------------------------------------------------------------
// Example 2: a NEW execution context is created for EVERY function call
// -----------------------------------------------------------------
function outer() {
  let count = 0;

  function increment() {
    count++; // this "count" refers to the OUTER function's execution
             // context via closure, not a new one
    console.log(count);
  }

  increment(); // 1 - new execution context created for THIS call
  increment(); // 2 - ANOTHER new execution context, but "count" is
               // still shared via the closure from outer()'s single context
}

outer();


// -----------------------------------------------------------------
// Example 3: each function call gets its OWN separate execution
// context, even for the same function called multiple times
// -----------------------------------------------------------------
function greet(name) {
  const message = `Hello, ${name}!`;
  return message;
}

console.log(greet("Alice")); // "Hello, Alice!"
console.log(greet("Bob"));   // "Hello, Bob!"
// Each call creates a BRAND NEW execution context with its own
// "name" and "message" variables - they don't interfere with each
// other, even though it's the SAME function being called twice.


// -----------------------------------------------------------------
// Example 4: "this" is determined per execution context (tied to HOW
// the function was called - see the "this" file for more depth)
// -----------------------------------------------------------------
const obj = {
  value: 42,
  showValue() {
    console.log(this.value); // "this" is set based on THIS call's
                              // execution context (called as obj.showValue())
  },
};

obj.showValue(); // 42
