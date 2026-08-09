/*
  11. Data Structures - Set
  Union of Two Arrays

  PROBLEM: combine two arrays into one list containing ALL unique
  values from BOTH of them (no duplicates).
  Example: [1, 2, 3] union [2, 3, 4] -> [1, 2, 3, 4]

  WHY A SET FITS: same reason as removeDuplicates - a Set automatically
  keeps only unique values. So if we just dump BOTH arrays into one
  Set, we get the union for free.
*/

function union(arr1, arr2) {
  // Spread both arrays into a single Set - duplicates across BOTH
  // arrays (and within each array) are automatically dropped.
  const unionSet = new Set([...arr1, ...arr2]);
  return [...unionSet];
}

console.log(union([1, 2, 3], [2, 3, 4]));
// [1, 2, 3, 4]

console.log(union(["a", "b"], ["b", "c", "d"]));
// ['a', 'b', 'c', 'd']

/*
  ONE-LINER VERSION:
*/
const unionOneLiner = (a, b) => [...new Set([...a, ...b])];
console.log(unionOneLiner([1, 2], [2, 3])); // [1, 2, 3]

/*
  TIME COMPLEXITY: O(n + m) - where n and m are the lengths of the two
  arrays. We process each item from both arrays once.
  SPACE COMPLEXITY: O(n + m) - worst case, every item from both arrays
  is unique and gets stored in the Set.
*/
