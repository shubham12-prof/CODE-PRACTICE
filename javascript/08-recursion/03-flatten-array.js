/*
  8.3 RECURSION - Flatten a Nested Array
  [1, [2, 3, [4, 5]], 6] -> [1, 2, 3, 4, 5, 6]
*/

function flattenArray(arr) {
  let result = [];

  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      // RECURSIVE CASE: this item is itself an array, flatten IT first,
      // then merge its items into our result.
      result = result.concat(flattenArray(arr[i]));
    } else {
      // BASE CASE (per item): plain value, push it directly.
      result.push(arr[i]);
    }
  }

  return result;
}

console.log(flattenArray([1, [2, 3, [4, 5]], 6]));
// [1, 2, 3, 4, 5, 6]

console.log(flattenArray([1, [2, [3, [4, [5]]]]]));
// [1, 2, 3, 4, 5]  -> works no matter how deep the nesting goes

/*
  WHY RECURSION FITS HERE:
  Every time we find a nested array, the problem becomes "flatten this
  smaller array" - the EXACT same problem, just smaller. That's the
  signal to use recursion: when a problem contains a smaller version
  of itself.
*/


// -----------------------------------------------------------------
// Bonus: JS has a built-in method for this
// -----------------------------------------------------------------
console.log([1, [2, 3, [4, 5]], 6].flat(Infinity));
// [1, 2, 3, 4, 5, 6]
// .flat(Infinity) flattens ALL levels, no matter how deep.
