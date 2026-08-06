/**
 * PROGRAM 9: Remove a Property from an Object
 * ------------------------------------------------
 * Goal: Remove one (or more) properties from an object.
 *
 * How it works:
 * - Approach 1 (mutating): the `delete` operator removes a property
 *   directly from the original object. Fast, but changes the
 *   original object in place — use only if that's what you want.
 * - Approach 2 (non-mutating / immutable): use object destructuring
 *   with the rest operator (...rest) to pull out the unwanted key
 *   and collect everything else into a brand-new object, leaving the
 *   original untouched. This is usually the safer, more predictable
 *   choice (especially in React/Redux-style code).
 */

// Approach 1: mutates the original object directly
function removePropertyMutating(obj, keyToRemove) {
  delete obj[keyToRemove];
  return obj;
}

// Approach 2: returns a NEW object without the given key (original untouched)
function removePropertyImmutable(obj, keyToRemove) {
  // Destructure: pull "keyToRemove" out into its own variable,
  // and gather all remaining properties into "rest".
  const { [keyToRemove]: _removed, ...rest } = obj;
  return rest;
}

// Remove multiple keys at once (immutable version)
function removeMultipleProperties(obj, keysToRemove) {
  const result = { ...obj };
  for (const key of keysToRemove) {
    delete result[key]; // safe here because "result" is already a copy
  }
  return result;
}

// ---------------- Example usage ----------------
const user = { id: 1, name: "Alice", password: "secret123", age: 25 };

const userWithoutPassword = removePropertyImmutable(user, "password");
console.log("Original user (untouched):", user);
console.log("User without password:", userWithoutPassword);

const stripped = removeMultipleProperties(user, ["password", "id"]);
console.log("User without password & id:", stripped);

// Mutating example (be careful, this changes 'user' itself)
const userCopy = { ...user };
removePropertyMutating(userCopy, "age");
console.log("userCopy after mutating removal:", userCopy);

module.exports = {
  removePropertyMutating,
  removePropertyImmutable,
  removeMultipleProperties,
};
