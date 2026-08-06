/**
 * PROGRAM 8: Nested Object Search
 * -----------------------------------
 * Goal: Search inside a deeply nested object to find a key (and its
 * value), even if we don't know exactly how deep it's buried.
 *
 * How it works:
 * - We recursively walk through every property of the object.
 * - If the current key matches the target key we're searching for,
 *   we return its value immediately.
 * - If the current value is itself an object, we recurse into it to
 *   keep searching deeper.
 * - If the value is an array, we recurse into each array element too
 *   (in case objects are nested inside arrays).
 * - If nothing is found after exploring everything, we return
 *   undefined to signal "not found".
 */

function findKeyDeep(obj, targetKey) {
  // Not an object (or null) -> nothing to search here
  if (typeof obj !== "object" || obj === null) return undefined;

  // If obj is an array, search each element
  if (Array.isArray(obj)) {
    for (const item of obj) {
      const found = findKeyDeep(item, targetKey);
      if (found !== undefined) return found;
    }
    return undefined;
  }

  // obj is a plain object -> check its own keys first
  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

    if (key === targetKey) {
      return obj[key]; // found it directly
    }

    // Not found at this level -> recurse into nested value
    const value = obj[key];
    if (typeof value === "object" && value !== null) {
      const found = findKeyDeep(value, targetKey);
      if (found !== undefined) return found;
    }
  }

  return undefined; // not found anywhere in this branch
}

// ---------------- Example usage ----------------
const company = {
  name: "TechCorp",
  departments: [
    {
      name: "Engineering",
      teams: [
        { name: "Backend", lead: { name: "Alice", email: "alice@corp.com" } },
        { name: "Frontend", lead: { name: "Bob", email: "bob@corp.com" } },
      ],
    },
  ],
};

console.log("Searching for 'email':", findKeyDeep(company, "email"));
// Output: 'alice@corp.com' (finds the first match while walking the tree)

console.log("Searching for 'missingKey':", findKeyDeep(company, "missingKey"));
// Output: undefined

module.exports = { findKeyDeep };
