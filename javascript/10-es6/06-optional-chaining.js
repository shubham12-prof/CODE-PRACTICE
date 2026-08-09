/*
  10.6 ES6+ - Optional Chaining (?.)

  CORE IDEA: safely access deeply nested properties WITHOUT crashing
  the program if something in the middle is null or undefined.
*/

// -----------------------------------------------------------------
// The problem optional chaining solves
// -----------------------------------------------------------------
const user1 = {
  name: "Kabir",
  address: { city: "Delhi" },
};

const user2 = {
  name: "Meera",
  // no "address" property at all
};

// OLD WAY - this would CRASH for user2 because address is undefined,
// and you can't read ".city" off of undefined.
// console.log(user2.address.city); // ❌ TypeError: Cannot read properties of undefined

// OLD WAY fix (verbose, has to check every step):
const city1 = user2.address && user2.address.city;
console.log(city1); // undefined (no crash, but clunky code)

// NEW WAY - optional chaining. If "address" is null/undefined, it just
// STOPS and returns undefined, instead of throwing an error.
console.log(user1.address?.city); // Delhi
console.log(user2.address?.city); // undefined (no crash!)


// -----------------------------------------------------------------
// Works on function calls too - only calls the function if it exists
// -----------------------------------------------------------------
const obj = {
  sayHi() {
    console.log("Hi!");
  },
};

obj.sayHi?.();   // Hi!               (function exists, gets called)
obj.sayBye?.();  // (nothing happens - sayBye doesn't exist, no crash)


// -----------------------------------------------------------------
// Works on array/bracket access too
// -----------------------------------------------------------------
const users = [{ name: "Kabir" }];

console.log(users[0]?.name); // Kabir
console.log(users[5]?.name); // undefined (index 5 doesn't exist, no crash)


// -----------------------------------------------------------------
// Chaining multiple levels deep - stops at the FIRST missing link
// -----------------------------------------------------------------
const company = {
  name: "TechCorp",
  // no "ceo" property
};

console.log(company.ceo?.address?.city); // undefined
// Even though address and city are also missing, JS stops checking
// as soon as it hits the first undefined (ceo), so it's still safe.

/*
  COMMON INTERVIEW POINT: optional chaining PREVENTS a crash, but it
  still returns "undefined" if something is missing - it doesn't
  magically give you real data. It's often paired with nullish
  coalescing (??) to also provide a fallback value.
*/
