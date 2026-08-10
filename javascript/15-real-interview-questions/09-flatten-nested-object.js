/*
  15. Real Interview Questions
  Flatten Nested Object

  PROBLEM: given a deeply nested object, flatten it into a single-level
  object where nested keys are joined with a separator (usually ".").
  Example:
    { a: 1, b: { c: 2, d: { e: 3 } } }
    -> { "a": 1, "b.c": 2, "b.d.e": 3 }

  CORE IDEA: recursion, walking through each key. If a value is itself
  an object, recurse into it, building up a "path" string (like
  "b.d.e") as we go deeper. If a value is a primitive, that's a
  finished leaf - store it directly using the full path as the key.
*/

function flattenObject(obj, parentKey = "", result = {}) {
  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

    // Build the new key path: "b" + "." + "c" -> "b.c"
    // (if there's no parentKey yet, just use the key by itself)
    const newKey = parentKey ? `${parentKey}.${key}` : key;
    const value = obj[key];

    // Check if the value is a "real" nested object (not null, not an
    // array - arrays are usually kept as-is rather than flattened
    // further, though you could adapt this if needed).
    const isNestedObject =
      typeof value === "object" && value !== null && !Array.isArray(value);

    if (isNestedObject) {
      // RECURSIVE CASE: go deeper, passing the growing key path along.
      flattenObject(value, newKey, result);
    } else {
      // BASE CASE: primitive value (or an array) - store it directly.
      result[newKey] = value;
    }
  }

  return result;
}

// -----------------------------------------------------------------
// Example usage
// -----------------------------------------------------------------
const nested = {
  a: 1,
  b: {
    c: 2,
    d: {
      e: 3,
      f: 4,
    },
  },
  g: 5,
};

console.log(flattenObject(nested));
// {
//   a: 1,
//   'b.c': 2,
//   'b.d.e': 3,
//   'b.d.f': 4,
//   g: 5
// }

/*
  WALKTHROUGH (simplified) for { a: 1, b: { c: 2 } }:
  key="a": not an object -> result.a = 1
  key="b": IS an object -> recurse with parentKey="b":
    key="c": newKey = "b.c", not an object -> result["b.c"] = 2
  Final result: { a: 1, "b.c": 2 }

  WHY "result" IS PASSED AS A PARAMETER (instead of creating a new
  object at every recursive call): this lets ALL recursive calls write
  into the SAME shared object, so the final flattened result naturally
  builds up across every level of recursion, instead of us having to
  manually merge separate objects together afterward.

  TIME COMPLEXITY: O(n) - where n is the total number of keys across
  every level of nesting.
*/
