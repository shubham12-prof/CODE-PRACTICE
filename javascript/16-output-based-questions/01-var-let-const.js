/*
  16. Output-Based Questions
  var, let, const

  KEY DIFFERENCES:
  - var:   function-scoped, can be redeclared, gets hoisted and
           initialized with "undefined" automatically.
  - let:   block-scoped, cannot be redeclared in the same scope, gets
           hoisted but NOT initialized (stays in the "temporal dead
           zone" until its line runs).
  - const: same as let, but the VARIABLE itself can never be reassigned
           after being set (though objects/arrays it points to CAN
           still be mutated internally).
*/

// -----------------------------------------------------------------
// Example 1: var is function-scoped, NOT block-scoped
// -----------------------------------------------------------------
function testVar() {
  if (true) {
    var x = 10;
  }
  console.log(x); // 10 - "var" leaks OUT of the if-block, it only
                   // respects FUNCTION boundaries, not block { } boundaries.
}
testVar();

function testLet() {
  if (true) {
    let y = 10;
  }
  // console.log(y); // ❌ ReferenceError: y is not defined
  // "let" is block-scoped - y only exists inside the { } it was declared in.
}
testLet();


// -----------------------------------------------------------------
// Example 2: classic "var in a loop" interview trap
// -----------------------------------------------------------------
console.log("--- var in setTimeout loop ---");
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var i:", i), 0);
}
// EXPECTED OUTPUT: var i: 3 / var i: 3 / var i: 3
// WHY: there's only ONE "i" (var is function/global-scoped, shared
// across every loop iteration). By the time the setTimeout callbacks
// actually RUN (after the loop has fully finished), i is already 3.

console.log("--- let in setTimeout loop ---");
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("let j:", j), 0);
}
// EXPECTED OUTPUT: let j: 0 / let j: 1 / let j: 2
// WHY: "let" creates a BRAND NEW binding of j for EACH loop iteration,
// so each setTimeout callback captures its OWN separate copy.


// -----------------------------------------------------------------
// Example 3: const prevents REASSIGNMENT, not mutation
// -----------------------------------------------------------------
const person = { name: "Alex" };
person.name = "Sam"; // ✅ allowed - we're mutating the object, not
                      // reassigning the variable "person" itself.
console.log(person); // { name: 'Sam' }

// person = { name: "New" }; // ❌ TypeError: Assignment to constant variable.


// -----------------------------------------------------------------
// Example 4: redeclaring with var vs let
// -----------------------------------------------------------------
var a = 1;
var a = 2; // ✅ allowed, var can be redeclared
console.log(a); // 2

let b = 1;
// let b = 2; // ❌ SyntaxError: Identifier 'b' has already been declared
