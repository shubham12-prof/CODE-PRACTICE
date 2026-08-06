/**
 * PROGRAM 3: Flatten a Nested Object
 * -------------------------------------
 * Goal: Convert a deeply nested object into a single-level object,
 * where nested keys are joined together with a separator (e.g. ".").
 *
 * Example: { a: { b: 1, c: { d: 2 } } }  ->  { "a.b": 1, "a.c.d": 2 }
 *
 * How it works:
 * - We recursively walk through each key of the object.
 * - We build up a "path" string as we go deeper (e.g. "a.c.d").
 * - If a value is a plain object (not array, not null), we recurse
 *   into it with the updated path prefix.
 * - If a value is a primitive (or an array, which we treat as a
 *   leaf value here), we assign it directly to the flattened result
 *   using the full path as the key.
 */

function flattenObject(obj, parentKey = "", result = {}) {
  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

    const value = obj[key];
    // Build the new key path, e.g. "a" -> "a.b" -> "a.b.c"
    const newKey = parentKey ? `${parentKey}.${key}` : key;

    const isPlainObject =
      typeof value === "object" && value !== null && !Array.isArray(value);

    if (isPlainObject) {
      // Recurse deeper into the nested object
      flattenObject(value, newKey, result);
    } else {
      // Leaf value (primitive or array) -> store it directly
      result[newKey] = value;
    }
  }
  return result;
}

// ---------------- Example usage ----------------
const nested = {
  a: 1,
  b: {
    c: 2,
    d: {
      e: 3,
      f: 4,
    },
  },
  g: [1, 2, 3], // arrays are kept as-is (treated as a leaf value)
};

console.log("Nested object:", JSON.stringify(nested));
console.log("Flattened object:", flattenObject(nested));
// Output: { a: 1, 'b.c': 2, 'b.d.e': 3, 'b.d.f': 4, g: [1, 2, 3] }

module.exports = { flattenObject };
