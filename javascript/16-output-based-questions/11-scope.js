/*
  16. Output-Based Questions
  Scope

  CORE IDEA: "scope" determines WHERE a variable is accessible. JS
  looks for a variable in the CURRENT scope first, and if not found,
  keeps checking OUTWARD through each enclosing scope, until it either
  finds it or reaches the global scope (this is called the "scope chain").
*/

// -----------------------------------------------------------------
// Example 1: nested scopes - inner scopes can see outer variables,
// but NOT the other way around
// -----------------------------------------------------------------
const globalVar = "I'm global";

function outer() {
  const outerVar = "I'm in outer";

  function inner() {
    const innerVar = "I'm in inner";
    console.log(globalVar); // ✅ accessible - outward lookup
    console.log(outerVar);  // ✅ accessible - outward lookup
    console.log(innerVar);  // ✅ accessible - own scope
  }

  inner();
  // console.log(innerVar); // ❌ ReferenceError - inner's variables are
                             // NOT visible from outer's scope
}

outer();


// -----------------------------------------------------------------
// Example 2: variable shadowing - inner scope's variable "hides" the
// outer one with the same name, WITHIN that inner scope only
// -----------------------------------------------------------------
let color = "blue";

function printColor() {
  let color = "red"; // this SHADOWS the outer "color" inside this function
  console.log(color); // "red"
}

printColor();
console.log(color); // "blue" - outer variable is completely unaffected


// -----------------------------------------------------------------
// Example 3: block scope vs function scope
// -----------------------------------------------------------------
function testBlockScope() {
  if (true) {
    let blockScoped = "only visible in this block";
    var functionScoped = "visible in the whole function";
  }

  // console.log(blockScoped); // ❌ ReferenceError - "let" respects
                                // block { } boundaries
  console.log(functionScoped); // ✅ "visible in the whole function" -
                                // "var" ignores block boundaries
}

testBlockScope();


// -----------------------------------------------------------------
// Example 4: closures capture the SCOPE, not just a value snapshot
// (this connects directly to how closures work)
// -----------------------------------------------------------------
function makeMultiplier(factor) {
  // "factor" belongs to makeMultiplier's scope - the returned function
  // keeps access to it forever, even after makeMultiplier() has
  // already finished running.
  return function (num) {
    return num * factor;
  };
}

const double = makeMultiplier(2);
const triple = makeMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
// Each call to makeMultiplier() creates its OWN separate "factor" in
// its own scope - double and triple don't interfere with each other.
