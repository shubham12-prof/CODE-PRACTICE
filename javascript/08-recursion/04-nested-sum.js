/*
  8.4 RECURSION - Sum of a Nested Array
  [1, [2, 3], [4, [5, 6]]] -> 21
*/

function nestedSum(arr) {
  let total = 0;

  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      // RECURSIVE CASE: sum the nested array first, add to running total.
      total += nestedSum(arr[i]);
    } else {
      // BASE CASE (per item): plain number, just add it.
      total += arr[i];
    }
  }

  return total;
}

console.log(nestedSum([1, [2, 3], [4, [5, 6]]])); // 21
console.log(nestedSum([1, 2, 3]));                // 6 (works for flat arrays too)

/*
  HOW TO SPOT WHEN TO USE RECURSION FOR THIS TYPE OF QUESTION:
  Whenever your data structure can contain "the same type of thing"
  inside itself (array inside array, object inside object, folder
  inside folder) - recursion is usually the cleanest fix, because the
  smaller version is solved the exact same way as the bigger version.
*/
