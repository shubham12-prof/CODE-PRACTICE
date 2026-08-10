/*
  16. Output-Based Questions
  Hoisting

  CORE IDEA: before running any code, JS "moves" (conceptually) all
  variable and function DECLARATIONS to the top of their scope. But
  HOW they're hoisted differs:
  - var: hoisted AND initialized with "undefined".
  - let/const: hoisted, but NOT initialized - accessing them before
    their actual line throws an error (this gap is called the
    "Temporal Dead Zone", or TDZ).
  - function declarations: hoisted WITH their full body - you can
    call them before their line in the code.
  - function expressions / arrow functions assigned to a variable:
    only the VARIABLE is hoisted (as undefined, or TDZ if let/const),
    not the function itself.
*/

// -----------------------------------------------------------------
// Example 1: var hoisting
// -----------------------------------------------------------------
console.log(a); // undefined (NOT an error - "a" was hoisted and
                 // initialized with undefined, but not yet ASSIGNED 5)
var a = 5;
console.log(a); // 5


// -----------------------------------------------------------------
// Example 2: let/const hoisting (Temporal Dead Zone)
// -----------------------------------------------------------------
// console.log(b); // ❌ ReferenceError: Cannot access 'b' before initialization
let b = 10;
console.log(b); // 10


// -----------------------------------------------------------------
// Example 3: function declaration hoisting - the WHOLE function is
// hoisted, so calling it BEFORE its written position still works.
// -----------------------------------------------------------------
sayHello(); // "Hello!" - works fine, even though called before definition

function sayHello() {
  console.log("Hello!");
}


// -----------------------------------------------------------------
// Example 4: function EXPRESSION hoisting - only the variable name is
// hoisted (as undefined), NOT the function body itself.
// -----------------------------------------------------------------
// sayBye(); // ❌ TypeError: sayBye is not a function
            // (at this point, sayBye is just "undefined", not a function yet)

var sayBye = function () {
  console.log("Bye!");
};
sayBye(); // "Bye!" - works now, AFTER the assignment has run


// -----------------------------------------------------------------
// Example 5: tricky combo - var inside a function shadows the outer one
// -----------------------------------------------------------------
var x = "global";

function testShadowing() {
  console.log(x); // undefined - NOT "global"!
  var x = "local"; // this declaration gets hoisted to the TOP of the
                    // function, so the local "x" (still undefined at
                    // that point) shadows the outer "global" x
                    // throughout the ENTIRE function.
  console.log(x); // "local"
}
testShadowing();

/*
  MENTAL MODEL FOR THE TRICKY EXAMPLE ABOVE:
  JS effectively rewrites testShadowing() like this internally:

    function testShadowing() {
      var x;              // hoisted declaration, starts undefined
      console.log(x);     // undefined
      x = "local";        // now it gets assigned
      console.log(x);     // "local"
    }
*/
