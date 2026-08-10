/*
  15. Real Interview Questions
  Polyfill for call()

  PROBLEM: implement your own version of Function.prototype.call -
  which IMMEDIATELY runs a function with a given "this" value, and
  arguments passed individually (not as an array).

  CORE IDEA: the trick is to TEMPORARILY attach the function as a
  property ON the target object, call it (so "this" naturally becomes
  that object), then remove it again to avoid leaving side effects.
*/

Function.prototype.myCall = function (context, ...args) {
  // "this" here is the function being called (e.g. `greet.myCall(...)`
  // means "this" is `greet`).

  // If no context given, default to the global object (like real call()).
  context = context || globalThis;

  // Use a Symbol so we don't accidentally overwrite a real property
  // that might already exist on the object with the name "fn".
  const fnKey = Symbol("fn");
  context[fnKey] = this;

  // Calling it as context[fnKey](...) makes "this" INSIDE the function
  // automatically become "context" - that's just how method calls work.
  const result = context[fnKey](...args);

  // Clean up - remove the temporary property so we don't pollute the object.
  delete context[fnKey];

  return result;
};

// -----------------------------------------------------------------
// Example usage
// -----------------------------------------------------------------
const person = { name: "Aman" };

function introduce(city, country) {
  console.log(`I'm ${this.name}, from ${city}, ${country}.`);
}

introduce.myCall(person, "Jaipur", "India");
// I'm Aman, from Jaipur, India.

/*
  CALL vs APPLY vs BIND - classic interview question:
  - call(context, arg1, arg2, ...)  -> runs immediately, args listed individually
  - apply(context, [arg1, arg2])    -> runs immediately, args as an array
  - bind(context, arg1, arg2, ...)  -> does NOT run immediately, returns a
                                        new function for later use
*/
