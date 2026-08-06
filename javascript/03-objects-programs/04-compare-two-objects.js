/**
 * PROGRAM 4: Compare Two Objects for Deep Equality
 * ---------------------------------------------------
 * Goal: Check whether two objects have the exact same structure and
 * values, including nested objects/arrays (a "deep equality" check).
 * A simple `obj1 === obj2` only checks reference equality, which
 * fails even for two objects with identical content, so we need a
 * recursive comparison.
 *
 * How it works:
 * - If both values are strictly equal (===), they're equal (covers
 *   primitives and same-reference objects).
 * - If either value is not an object (or is null), and they weren't
 *   caught by the === check above, they're not equal.
 * - Otherwise, both are objects: compare their key counts, then
 *   recursively compare each corresponding value.
 */

function deepEqual(a, b) {
  // 1. Same reference or same primitive value
  if (a === b) return true;

  // 2. If either is not a non-null object, they can't be deeply equal
  //    beyond the strict check above (e.g. 1 vs "1", null vs {})
  if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) {
    return false;
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  // 3. Different number of keys -> definitely not equal
  if (keysA.length !== keysB.length) return false;

  // 4. Check every key in "a" exists in "b" with a deeply equal value
  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
    if (!deepEqual(a[key], b[key])) return false; // recursive check
  }

  return true;
}

// ---------------- Example usage ----------------
const obj1 = { name: "Alice", address: { city: "Delhi", zip: 110001 } };
const obj2 = { name: "Alice", address: { city: "Delhi", zip: 110001 } };
const obj3 = { name: "Alice", address: { city: "Mumbai", zip: 110001 } };

console.log("obj1 === obj2 (reference):", obj1 === obj2); // false
console.log("deepEqual(obj1, obj2):", deepEqual(obj1, obj2)); // true
console.log("deepEqual(obj1, obj3):", deepEqual(obj1, obj3)); // false

module.exports = { deepEqual };
