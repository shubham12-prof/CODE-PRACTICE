/**
 * PROGRAM 7: Convert Array to Object
 * -------------------------------------
 * Goal: Turn an array into an object, in a couple of common forms:
 *  a) An array of [key, value] pairs -> object (using Object.fromEntries)
 *  b) A plain array of values -> object keyed by index ("0","1",...)
 *  c) An array of objects -> object keyed by some chosen field (e.g. id)
 *
 * How it works:
 * - Object.fromEntries(arrayOfPairs) is the built-in inverse of
 *   Object.entries(); it takes [[k,v], [k,v], ...] and builds an object.
 * - For "array of objects keyed by a field", we use .reduce() to build
 *   up the result object, using each item's chosen field as the key.
 */

// a) Array of [key, value] pairs -> object
function pairsArrayToObject(pairsArray) {
  return Object.fromEntries(pairsArray);
}

// b) Plain array of values -> object keyed by index
function arrayToIndexedObject(arr) {
  return { ...arr };
  // Spreading an array into an object literal automatically uses
  // the array indices ("0", "1", "2", ...) as the object's keys.
}

// c) Array of objects -> object keyed by a chosen field (e.g. "id")
function arrayOfObjectsToObjectByKey(arr, keyField) {
  return arr.reduce((accumulatorObj, currentItem) => {
    accumulatorObj[currentItem[keyField]] = currentItem;
    return accumulatorObj;
  }, {});
}

// ---------------- Example usage ----------------
const pairs = [
  ["name", "Alice"],
  ["age", 25],
];
console.log("a) Pairs -> object:", pairsArrayToObject(pairs));
// { name: 'Alice', age: 25 }

const simpleArray = ["apple", "banana", "cherry"];
console.log("b) Array -> indexed object:", arrayToIndexedObject(simpleArray));
// { '0': 'apple', '1': 'banana', '2': 'cherry' }

const users = [
  { id: "u1", name: "Alice" },
  { id: "u2", name: "Bob" },
];
console.log(
  "c) Array of objects -> object keyed by id:",
  arrayOfObjectsToObjectByKey(users, "id")
);
// { u1: { id: 'u1', name: 'Alice' }, u2: { id: 'u2', name: 'Bob' } }

module.exports = {
  pairsArrayToObject,
  arrayToIndexedObject,
  arrayOfObjectsToObjectByKey,
};
