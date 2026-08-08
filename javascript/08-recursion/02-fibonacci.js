/*
  8.2 RECURSION - Fibonacci
  fib(n) = fib(n-1) + fib(n-2), fib(0) = 0, fib(1) = 1
*/

function fibonacci(n) {
  // BASE CASES
  if (n === 0) return 0;
  if (n === 1) return 1;
  // RECURSIVE CASE
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(6)); // 8  (sequence: 0,1,1,2,3,5,8)

/*
  WARNING - very common interview follow-up:
  This simple version is SLOW for large n because it recalculates the
  same values again and again (fib(5) calls fib(3) twice, fib(2) three
  times, etc). This is called "overlapping subproblems" and makes time
  complexity O(2^n) - exponential, very bad.

  FIX: "memoization" - cache answers we've already calculated.
*/

function fibonacciMemo(n, cache = {}) {
  if (n in cache) return cache[n];
  if (n === 0) return 0;
  if (n === 1) return 1;
  cache[n] = fibonacciMemo(n - 1, cache) + fibonacciMemo(n - 2, cache);
  return cache[n];
}

console.log(fibonacciMemo(50)); // instant, plain recursive version would hang

/*
  Time complexity comparison:
  - fibonacci (plain recursion):   O(2^n)  -> slow, avoid for big n
  - fibonacciMemo (with caching):  O(n)    -> fast
*/
