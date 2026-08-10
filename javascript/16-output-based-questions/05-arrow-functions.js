/*
  16. Output-Based Questions
  Arrow Functions

  KEY DIFFERENCES FROM REGULAR FUNCTIONS:
  1. No own "this" - inherits it from the surrounding scope (see file
     04-this-keyword.js for detailed examples).
  2. No "arguments" object - trying to use "arguments" inside an arrow
     function looks it up in the OUTER scope instead.
  3. Cannot be used as a constructor (no "new" allowed).
  4. Implicit return when written without curly braces.
*/

// -----------------------------------------------------------------
// Example 1: implicit return - easy to misread the output
// -----------------------------------------------------------------
const double = (n) => n * 2;
console.log(double(5)); // 10 - no "return" keyword needed, no { } used

const doubleExplicit = (n) => {
  return n * 2; // WITH curly braces, you DO need "return" explicitly
};
console.log(doubleExplicit(5)); // 10

// COMMON TRAP: returning an object literal with implicit return needs
// parentheses, otherwise { } is read as a function BODY, not an object.
const makeObjWrong = (name) => { name: name }; // ❌ this is actually a
// function body with a LABELED STATEMENT "name: name" inside it, NOT
// an object - it silently returns undefined!
console.log(makeObjWrong("Alex")); // undefined

const makeObjRight = (name) => ({ name: name }); // ✅ parentheses make
// JS treat the { } as an object literal being returned.
console.log(makeObjRight("Alex")); // { name: 'Alex' }


// -----------------------------------------------------------------
// Example 2: arrow functions have NO "arguments" object
// -----------------------------------------------------------------
function regularFn() {
  console.log(arguments); // works - logs an array-like object of all args
}
regularFn(1, 2, 3); // [Arguments] { '0': 1, '1': 2, '2': 3 }

const arrowFn = () => {
  // console.log(arguments); // ❌ ReferenceError (in a truly standalone
  // arrow function with no enclosing function) OR it refers to an
  // OUTER function's arguments if there is one - never its own.
};

function outer() {
  const inner = () => {
    console.log(arguments); // logs OUTER's arguments, not inner's own
  };
  inner(100, 200);
}
outer(1, 2, 3); // logs [Arguments] { '0': 1, '1': 2, '2': 3 } - from outer()!


// -----------------------------------------------------------------
// Example 3: arrow functions cannot be used as constructors
// -----------------------------------------------------------------
const Person = (name) => {
  this.name = name;
};
// new Person("Sam"); // ❌ TypeError: Person is not a constructor


// -----------------------------------------------------------------
// Example 4: array methods - arrow functions are commonly used as
// short inline callbacks
// -----------------------------------------------------------------
const nums = [1, 2, 3, 4];
console.log(nums.map((n) => n * n)); // [1, 4, 9, 16]
console.log(nums.filter((n) => n % 2 === 0)); // [2, 4]
