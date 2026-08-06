/**
 * PROGRAM 1: Merge Two Objects
 * -----------------------------
 * Goal: Combine the properties of two objects into a single new object.
 *
 * How it works:
 * - The spread operator (...) copies all "own enumerable" properties
 *   of an object into a new object literal { }.
 * - When we spread obj1 first and obj2 second, any key that exists in
 *   BOTH objects will take the value from obj2 (the later spread wins),
 *   because later keys overwrite earlier ones when building the object.
 * - This does NOT modify obj1 or obj2 — it creates a brand new object.
 *   (Note: this is a SHALLOW merge — nested objects are copied by
 *   reference, not deeply merged. See program 2 for deep cloning.)
 */

function mergeObjects(obj1, obj2) {
  // Spread both objects into a new object literal.
  // Properties from obj2 override obj1 if keys clash.
  return { ...obj1, ...obj2 };
}

// Alternative way using Object.assign (does the same thing):
function mergeObjectsUsingAssign(obj1, obj2) {
  // Object.assign(target, ...sources) copies sources into target.
  // We pass {} as target so obj1/obj2 themselves aren't mutated.
  return Object.assign({}, obj1, obj2);
}

// ---------------- Example usage ----------------
const objA = { name: "Alice", age: 25 };
const objB = { age: 26, city: "Delhi" };

const merged = mergeObjects(objA, objB);
console.log("Merged object:", merged);
// Output: { name: 'Alice', age: 26, city: 'Delhi' }
// Note: age became 26 because objB's age overwrote objA's age.

console.log("Using Object.assign:", mergeObjectsUsingAssign(objA, objB));

module.exports = { mergeObjects, mergeObjectsUsingAssign };
