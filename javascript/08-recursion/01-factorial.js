/*
  8.1 RECURSION - Factorial
  n! = n * (n-1) * (n-2) * ... * 1

  Every recursive function needs:
  1. BASE CASE - stops the recursion.
  2. RECURSIVE CASE - calls itself with a smaller version of the problem.
*/

function factorial(n) {
  // BASE CASE: factorial of 0 or 1 is always 1.
  if (n === 0 || n === 1) {
    return 1;
  }
  // RECURSIVE CASE: n! = n * (n-1)!
  return n * factorial(n - 1);
}

console.log(factorial(5)); // 120
console.log(factorial(0)); // 1

/*
  HOW IT RUNS for factorial(4):
  factorial(4) -> 4 * factorial(3)
               -> 4 * (3 * factorial(2))
               -> 4 * (3 * (2 * factorial(1)))
               -> 4 * (3 * (2 * 1))
               -> 24
  Each call waits for the one below it to return before it can multiply.
*/


// -----------------------------------------------------------------
// Bonus: iterative version (interviewers often ask "can you do it
// without recursion too?")
// -----------------------------------------------------------------
function factorialIterative(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

console.log(factorialIterative(5)); // 120
