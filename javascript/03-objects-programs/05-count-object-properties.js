/**
 * PROGRAM 5: Count Object Properties
 * -------------------------------------
 * Goal: Count how many "own" (directly defined, not inherited)
 * enumerable properties an object has.
 *
 * How it works:
 * - Object.keys(obj) returns an array of the object's own enumerable
 *   property names (ignoring inherited/prototype properties).
 * - The .length of that array tells us the count.
 * - We also show a version that counts only "top-level" keys vs one
 *   that counts ALL keys recursively (including nested objects).
 */

function countProperties(obj) {
  // Object.keys only returns the object's OWN enumerable keys
  return Object.keys(obj).length;
}

// Recursive version: counts every key at every nesting level
function countAllPropertiesDeep(obj) {
  let count = 0;
  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
    count++; // count this key itself
    const value = obj[key];
    // If the value is a plain nested object, recurse into it too
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      count += countAllPropertiesDeep(value);
    }
  }
  return count;
}

// ---------------- Example usage ----------------
const person = {
  name: "Alice",
  age: 25,
  address: {
    city: "Delhi",
    pin: 110001,
  },
};

console.log("Top-level property count:", countProperties(person));
// Output: 3  ('name', 'age', 'address' are the only top-level keys)

console.log("Deep (all nested) property count:", countAllPropertiesDeep(person));
// Output: 5  (name, age, address, address.city, address.pin)

module.exports = { countProperties, countAllPropertiesDeep };
