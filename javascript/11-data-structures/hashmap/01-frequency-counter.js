/*
  11. Data Structures - HashMap
  Frequency Counter

  PROBLEM: count how many times each element appears in an array (or
  each character in a string).
  Example: ["a", "b", "a", "c", "b", "a"] -> { a: 3, b: 2, c: 1 }

  WHY A HASHMAP FITS: we need to look up "have I seen this before?" and
  update its count, as fast as possible. A HashMap (in JS: a plain
  object, or a Map) gives O(1) lookup/update by key - much faster than
  searching through an array each time (which would be O(n)).
*/

function frequencyCounter(arr) {
  const freq = {}; // plain object used as a hashmap: { value: count }

  for (const item of arr) {
    // If we've seen "item" before, add 1 to its count.
    // If not, (freq[item] || 0) gives us 0 to start from.
    freq[item] = (freq[item] || 0) + 1;
  }

  return freq;
}

console.log(frequencyCounter(["a", "b", "a", "c", "b", "a"]));
// { a: 3, b: 2, c: 1 }

console.log(frequencyCounter([1, 2, 2, 3, 3, 3]));
// { '1': 1, '2': 2, '3': 3 }  (object keys are always strings)


// -----------------------------------------------------------------
// Same idea, using a Map instead of a plain object (better when keys
// might not be strings, e.g. objects, or when key order matters)
// -----------------------------------------------------------------
function frequencyCounterMap(arr) {
  const freq = new Map();

  for (const item of arr) {
    // Map.get(key) returns undefined if not found, so default to 0.
    freq.set(item, (freq.get(item) || 0) + 1);
  }

  return freq;
}

console.log(frequencyCounterMap(["a", "b", "a"]));
// Map(2) { 'a' => 2, 'b' => 1 }

/*
  COMMON USE CASE - this pattern shows up constantly in interviews:
  "find the most frequent element", "check if two strings are anagrams",
  "find duplicates" - almost all of these start with building a
  frequency counter first.

  TIME COMPLEXITY: O(n) - one pass through the array, O(1) work per item.
  SPACE COMPLEXITY: O(k) - where k is the number of UNIQUE items.
*/
