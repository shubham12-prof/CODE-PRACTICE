/*
  15. Real Interview Questions
  Polyfill for apply()

  PROBLEM: implement your own version of Function.prototype.apply -
  same as call(), but arguments are passed as a SINGLE ARRAY instead
  of individually.

  CORE IDEA: nearly identical to the call() polyfill - the only real
  difference is how arguments are received (an array vs individual
  values), everything else about attaching-and-calling stays the same.
*/

Function.prototype.myApply = function (context, argsArray) {
  context = context || globalThis;

  const fnKey = Symbol("fn");
  context[fnKey] = this;

  // If no array was passed, default to an empty array so the spread
  // below doesn't throw an error.
  const result = context[fnKey](...(argsArray || []));

  delete context[fnKey];

  return result;
};

// -----------------------------------------------------------------
// Example usage
// -----------------------------------------------------------------
const person = { name: "Divya" };

function introduce(city, country) {
  console.log(`I'm ${this.name}, from ${city}, ${country}.`);
}

introduce.myApply(person, ["Chennai", "India"]);
// I'm Divya, from Chennai, India.

/*
  WHEN TO USE APPLY OVER CALL (classic follow-up):
  apply() is handy when you already HAVE your arguments as an array
  (or array-like value) and don't want to manually spread them out.
  Example: Math.max.apply(null, [3, 7, 2]) instead of Math.max(3, 7, 2)
  - though in modern JS, the spread operator often replaces this use
  case: Math.max(...[3, 7, 2]).
*/
