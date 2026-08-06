/**
 * PROGRAM 6: Convert Object to Array
 * -------------------------------------
 * Goal: Turn an object's keys/values/entries into arrays, which is
 * useful because arrays support methods like map, filter, reduce
 * that plain objects don't have directly.
 *
 * How it works:
 * - Object.keys(obj)   -> array of just the property names
 * - Object.values(obj) -> array of just the property values
 * - Object.entries(obj)-> array of [key, value] pairs (most flexible,
 *                         since it preserves the key-value relationship)
 */

function objectToKeysArray(obj) {
  return Object.keys(obj); // e.g. ['name', 'age']
}

function objectToValuesArray(obj) {
  return Object.values(obj); // e.g. ['Alice', 25]
}

function objectToEntriesArray(obj) {
  return Object.entries(obj); // e.g. [['name','Alice'], ['age',25]]
}

// Convert to an array of custom objects, e.g. [{ key, value }, ...]
function objectToKeyValueArray(obj) {
  return Object.entries(obj).map(([key, value]) => ({ key, value }));
}

// ---------------- Example usage ----------------
const person = { name: "Alice", age: 25, city: "Delhi" };

console.log("Keys array:", objectToKeysArray(person));
// [ 'name', 'age', 'city' ]

console.log("Values array:", objectToValuesArray(person));
// [ 'Alice', 25, 'Delhi' ]

console.log("Entries array:", objectToEntriesArray(person));
// [ ['name','Alice'], ['age',25], ['city','Delhi'] ]

console.log("Key-value object array:", objectToKeyValueArray(person));
// [ { key: 'name', value: 'Alice' }, { key: 'age', value: 25 }, ... ]

module.exports = {
  objectToKeysArray,
  objectToValuesArray,
  objectToEntriesArray,
  objectToKeyValueArray,
};
