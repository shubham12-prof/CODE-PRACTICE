/*
  11. Data Structures - Set
  Intersection of Two Arrays

  PROBLEM: find the values that appear in BOTH arrays.
  Example: [1, 2, 3, 4] intersect [2, 4, 6] -> [2, 4]

  WHY A SET FITS: we turn the FIRST array into a Set so we can check
  "is this value in array1?" in O(1) time. Then we loop through the
  SECOND array and keep only the values that also exist in that Set -
  much faster than checking with .includes() (which is O(n) per check).
*/

function intersection(arr1, arr2) {
  const set1 = new Set(arr1); // O(1) lookup for "does this exist in arr1?"
  const result = new Set();   // use a Set here too, to avoid duplicate matches

  for (const item of arr2) {
    if (set1.has(item)) {
      result.add(item);
    }
  }

  return [...result];
}

console.log(intersection([1, 2, 3, 4], [2, 4, 6]));
// [2, 4]

console.log(intersection(["a", "b", "c"], ["b", "c", "d"]));
// ['b', 'c']

console.log(intersection([1, 2, 2, 3], [2, 2, 3])); // duplicates in input
// [2, 3]  -> result Set prevents "2" from appearing twice in the output

/*
  WHY set1.has() INSTEAD OF arr1.includes():
  set1.has(item) is O(1) - a hashmap-style instant lookup.
  arr1.includes(item) is O(n) - it has to scan the whole array every
  single time. Using a Set turns an O(n*m) brute-force solution into
  an O(n+m) one.

  TIME COMPLEXITY: O(n + m) - building the Set is O(n), then one pass
  over the second array is O(m).
  SPACE COMPLEXITY: O(n + m) worst case, for set1 and the result Set.
*/
