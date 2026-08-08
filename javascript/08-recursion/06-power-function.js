/*
  8.6 RECURSION - Power Function
  Calculate base^exponent without using ** or Math.pow()
*/

// -----------------------------------------------------------------
// Simple version - O(n) time
// -----------------------------------------------------------------
function power(base, exponent) {
  // BASE CASE: anything to the power of 0 is 1.
  if (exponent === 0) {
    return 1;
  }
  // RECURSIVE CASE: base^exp = base * base^(exp-1)
  return base * power(base, exponent - 1);
}

console.log(power(2, 5)); // 32
console.log(power(3, 0)); // 1

/*
  HOW IT RUNS for power(2, 4):
  power(2,4) = 2 * power(2,3)
             = 2 * (2 * power(2,2))
             = 2 * (2 * (2 * power(2,1)))
             = 2 * (2 * (2 * (2 * power(2,0))))
             = 2 * 2 * 2 * 2 * 1
             = 16
*/


// -----------------------------------------------------------------
// Optimized version - O(log n) time using "fast exponentiation"
// Good one to mention if the interviewer asks "can you make it faster?"
// -----------------------------------------------------------------
function fastPower(base, exponent) {
  if (exponent === 0) return 1;

  if (exponent % 2 === 0) {
    // exponent is EVEN: base^exp = (base^(exp/2))^2
    const half = fastPower(base, exponent / 2);
    return half * half;
  } else {
    // exponent is ODD: base^exp = base * base^(exp-1)
    return base * fastPower(base, exponent - 1);
  }
}

console.log(fastPower(2, 10)); // 1024

/*
  WHY IT'S FASTER:
  - Simple version: power(2, 10) makes 10 recursive calls.
  - Fast version: roughly HALVES the exponent each time it's even
    (10 -> 5 -> 4 -> 2 -> 1 -> 0), needing only ~log2(10) ≈ 4-5 calls
    instead of 10. For huge exponents the difference becomes massive.
*/
