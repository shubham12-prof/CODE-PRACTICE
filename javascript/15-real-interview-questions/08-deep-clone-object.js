/*
  15. Real Interview Questions
  Deep Clone Object

  PROBLEM: create a TRUE copy of an object/array, including all nested
  objects/arrays inside it, so that changing the copy NEVER affects
  the original (unlike a shallow copy, e.g. {...obj}, which only
  copies the TOP level - nested objects would still be shared).

  CORE IDEA: recursion. For each value: if it's an object or array,
  recursively clone IT too. If it's a primitive (number, string,
  boolean, etc.), just copy it directly (primitives are already safe -
  copying a number can't create shared references).
*/

function deepClone(value) {
  // BASE CASE: primitives (number, string, boolean, null, undefined)
  // are copied "by value" automatically in JS - nothing special needed.
  if (value === null || typeof value !== "object") {
    return value;
  }

  // RECURSIVE CASE for arrays: clone each item.
  if (Array.isArray(value)) {
    return value.map((item) => deepClone(item));
  }

  // RECURSIVE CASE for plain objects: clone each key's value.
  const clonedObj = {};
  for (const key in value) {
    // hasOwnProperty check avoids accidentally copying inherited
    // properties from the prototype chain.
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      clonedObj[key] = deepClone(value[key]);
    }
  }
  return clonedObj;
}

// -----------------------------------------------------------------
// Example usage
// -----------------------------------------------------------------
const original = {
  name: "Neha",
  address: { city: "Delhi", pin: 110001 },
  hobbies: ["reading", "chess"],
};

const cloned = deepClone(original);
cloned.address.city = "Mumbai"; // change the COPY
cloned.hobbies.push("cycling");

console.log(original.address.city); // "Delhi"  -> original is UNAFFECTED
console.log(original.hobbies);      // ["reading", "chess"]  -> unaffected

console.log(cloned.address.city);   // "Mumbai"
console.log(cloned.hobbies);        // ["reading", "chess", "cycling"]

/*
  WHY A SHALLOW COPY ({...obj}) ISN'T ENOUGH:
  const shallow = { ...original };
  shallow.address.city = "Mumbai";
  console.log(original.address.city); // "Mumbai" too! ❌ BUG - because
  the nested "address" object is still the SAME object in memory,
  just referenced from two places. Spread only copies the TOP level.

  BONUS - built-in alternative for simple cases:
  structuredClone(obj) is a native browser/Node function that deep
  clones for you (works for most data, but not functions or some
  special objects). JSON.parse(JSON.stringify(obj)) is an older trick
  that works similarly but loses functions, undefined values, and Dates
  become strings - has real limitations, worth mentioning in interviews.

  TIME COMPLEXITY: O(n) - where n is the total number of
  values/properties across the whole nested structure.
*/
