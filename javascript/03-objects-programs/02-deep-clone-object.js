/**
 * PROGRAM 2: Deep Clone an Object
 * ---------------------------------
 * Goal: Create a completely independent copy of an object, including
 * all nested objects/arrays, so changing the clone never affects the
 * original (unlike a shallow copy via spread/Object.assign).
 *
 * How it works (manual recursive approach):
 * - If the value is not an object (i.e. it's a primitive like number,
 *   string, boolean, null, undefined) -> just return it as-is, since
 *   primitives are copied by value automatically.
 * - If the value is an Array -> create a new array and recursively
 *   deep-clone each element.
 * - If the value is a plain Object -> create a new object and
 *   recursively deep-clone each property value.
 * - Recursion handles arbitrarily nested structures.
 *
 * Note: JS also has a built-in `structuredClone(obj)` (modern
 * environments) that does deep cloning natively — shown below too.
 */

function deepClone(value) {
  // 1. Primitives (number, string, boolean, null, undefined) -> return directly
  if (value === null || typeof value !== "object") {
    return value;
  }

  // 2. Arrays -> clone each element recursively
  if (Array.isArray(value)) {
    return value.map((item) => deepClone(item));
  }

  // 3. Plain objects -> clone each key/value recursively
  const clonedObj = {};
  for (const key in value) {
    // hasOwnProperty ensures we only copy the object's own keys,
    // not inherited ones from its prototype chain.
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      clonedObj[key] = deepClone(value[key]);
    }
  }
  return clonedObj;
}

// ---------------- Example usage ----------------
const original = {
  name: "Bob",
  address: { city: "Delhi", pin: 110001 },
  hobbies: ["reading", "chess", { indoor: true }],
};

const cloned = deepClone(original);

// Mutate the clone deeply
cloned.address.city = "Mumbai";
cloned.hobbies.push("cycling");

console.log("Original:", JSON.stringify(original));
console.log("Cloned:  ", JSON.stringify(cloned));
// Original stays untouched because deepClone made independent copies
// of the nested "address" object and "hobbies" array.

// Built-in modern alternative (Node 17+/browsers):
const clonedUsingStructuredClone =
  typeof structuredClone === "function" ? structuredClone(original) : null;
console.log("structuredClone result:", clonedUsingStructuredClone);

module.exports = { deepClone };
