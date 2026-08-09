/*
  11. Data Structures - Set
  Remove Duplicates

  PROBLEM: given an array, remove all duplicate values, keeping only
  unique ones.
  Example: [1, 2, 2, 3, 4, 4, 4, 5] -> [1, 2, 3, 4, 5]

  WHY A SET FITS: a Set is a built-in JS data structure that can ONLY
  hold UNIQUE values - if you try to add a value that's already in it,
  nothing happens (no duplicate gets added). That's exactly the
  behavior we want here.
*/

function removeDuplicates(arr) {
  // Creating a Set from the array automatically drops any duplicates.
  const uniqueSet = new Set(arr);

  // Convert back to a regular array using the spread operator.
  return [...uniqueSet];
}

console.log(removeDuplicates([1, 2, 2, 3, 4, 4, 4, 5]));
// [1, 2, 3, 4, 5]

console.log(removeDuplicates(["a", "b", "a", "c", "b"]));
// ['a', 'b', 'c']

/*
  ONE-LINER VERSION (same idea, very common in real code):
*/
const unique = (arr) => [...new Set(arr)];
console.log(unique([5, 5, 5, 1, 1, 2])); // [5, 1, 2]

/*
  IMPORTANT NOTE: order is PRESERVED based on first appearance - a Set
  in JS remembers insertion order, it doesn't sort or shuffle values.

  TIME COMPLEXITY: O(n) - adding each item to a Set is O(1), done n times.
  SPACE COMPLEXITY: O(n) - worst case, all items are unique and get stored.
*/
