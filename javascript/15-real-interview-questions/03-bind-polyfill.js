/*
  15. Real Interview Questions
  Polyfill for bind()

  PROBLEM: implement your own version of Function.prototype.bind -
  which returns a NEW function that, when called, runs the original
  function with "this" permanently set to whatever you specify, plus
  any pre-set ("bound") arguments.

  CORE IDEA: bind() doesn't call the function immediately - it returns
  a NEW function that calls the original one later, using .apply() (or
  .call()) to force the correct "this" value.
*/

Function.prototype.myBind = function (context, ...boundArgs) {
  // "this" here refers to the ORIGINAL function being bound
  // (e.g. in `greet.myBind(obj)`, "this" is `greet`).
  const originalFn = this;

  // Return a new function - this is what actually gets called later.
  return function (...callArgs) {
    // Combine args given at bind-time with args given at call-time.
    // Example: fn.myBind(obj, 1, 2)(3, 4) -> calls fn with (1,2,3,4)
    return originalFn.apply(context, [...boundArgs, ...callArgs]);
  };
};

// -----------------------------------------------------------------
// Example usage
// -----------------------------------------------------------------
const person = { name: "Riya" };

function greet(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}

const boundGreet = greet.myBind(person, "Hello");
boundGreet("!"); // Hello, Riya!

// Even if we grab the function and call it standalone, "this" stays
// locked to "person" - that's the whole point of bind.
const detachedGreet = boundGreet;
detachedGreet("?"); // Hello, Riya?

/*
  WHY THIS MATTERS: without bind, if you pass a method as a callback
  (e.g. setTimeout(obj.method, 1000)), "this" inside that method would
  become undefined or the wrong object, because it loses its
  connection to "obj". bind() locks "this" in place permanently,
  regardless of how the function is later called.

  NOTE: real Function.prototype.bind also supports being used with
  "new" (constructor calls) in a special way - this simplified
  polyfill covers the normal function-call case, which is what
  interviewers usually want to see.
*/
