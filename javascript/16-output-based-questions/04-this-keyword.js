/*
  16. Output-Based Questions
  this

  CORE IDEA: unlike most variables, "this" is NOT determined by WHERE
  a function is written - it's determined by HOW the function is
  CALLED. The main rules:
  1. Called as obj.method() -> "this" is "obj".
  2. Called as a plain function() -> "this" is undefined (strict mode)
     or the global object (non-strict mode).
  3. Called with new Fn() -> "this" is the newly created object.
  4. Called with .call()/.apply()/.bind() -> "this" is whatever you
     explicitly pass in.
  5. Arrow functions have NO OWN "this" - they simply use whatever
     "this" was in the SURROUNDING (enclosing) scope where they were
     WRITTEN, not where they're called.
*/

// -----------------------------------------------------------------
// Example 1: method call vs standalone call
// -----------------------------------------------------------------
const person = {
  name: "Riya",
  greet() {
    console.log(`Hi, I'm ${this.name}`);
  },
};

person.greet(); // "Hi, I'm Riya" - this = person (called AS a method)

const greetFn = person.greet;
// greetFn(); // "Hi, I'm undefined" - this is now undefined/global,
             // because we called it standalone, detached from "person".


// -----------------------------------------------------------------
// Example 2: arrow functions DON'T have their own "this"
// -----------------------------------------------------------------
const person2 = {
  name: "Kabir",
  greetArrow: () => {
    // Arrow function's "this" comes from the OUTER scope where it was
    // DEFINED (here, that's the top-level/module scope, NOT person2),
    // so "this.name" is undefined.
    console.log(`Hi, I'm ${this.name}`);
  },
};

person2.greetArrow(); // "Hi, I'm undefined"


// -----------------------------------------------------------------
// Example 3: the classic "this inside a regular callback" trap, and
// how arrow functions fix it
// -----------------------------------------------------------------
const timer = {
  seconds: 0,
  startRegular() {
    setTimeout(function () {
      // Regular function -> "this" here is NOT "timer" anymore
      // (setTimeout calls it as a standalone function).
      this.seconds++; // this.seconds is undefined, so this becomes NaN
      console.log("Regular function this.seconds:", this.seconds);
    }, 100);
  },
  startArrow() {
    setTimeout(() => {
      // Arrow function -> "this" is inherited from startArrow()'s
      // scope, where "this" correctly refers to "timer".
      this.seconds++;
      console.log("Arrow function this.seconds:", this.seconds);
    }, 100);
  },
};

timer.startRegular(); // logs: Regular function this.seconds: NaN
timer.startArrow();   // logs: Arrow function this.seconds: 1


// -----------------------------------------------------------------
// Example 4: this with call/apply/bind
// -----------------------------------------------------------------
function introduce() {
  console.log(`I'm ${this.name}`);
}

const user1 = { name: "Dev" };
introduce.call(user1);  // "I'm Dev" - this is explicitly forced to user1

const boundIntroduce = introduce.bind(user1);
boundIntroduce(); // "I'm Dev" - this stays locked to user1 permanently


// -----------------------------------------------------------------
// Example 5: this inside a class
// -----------------------------------------------------------------
class Counter {
  count = 0;

  incrementRegular() {
    // If this method is called standalone (detached), "this" breaks.
    this.count++;
  }

  incrementArrow = () => {
    // Class field arrow functions automatically bind "this" to the
    // instance, so this one is SAFE to pass around as a callback.
    this.count++;
  };
}

const c = new Counter();
const detachedRegular = c.incrementRegular;
// detachedRegular(); // ❌ TypeError: Cannot read properties of
                       // undefined (this is undefined when detached)

const detachedArrow = c.incrementArrow;
detachedArrow(); // ✅ works fine, this.count becomes 1
console.log(c.count); // 1
