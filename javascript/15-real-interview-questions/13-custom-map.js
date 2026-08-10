/*
  15. Real Interview Questions
  Custom map()

  PROBLEM: implement your own version of Array.prototype.map() -
  transforms every element in an array using a callback function, and
  returns a NEW array with the transformed values (original array is
  left unchanged).

  CORE IDEA: loop through the array, call the callback on each item,
  and push the RETURNED value into a new result array.
*/

Array.prototype.myMap = function (callback) {
  const result = [];

  for (let i = 0; i < this.length; i++) {
    // Real map() passes (element, index, array) to the callback,
    // matching that signature so it behaves like the real thing.
    result.push(callback(this[i], i, this));
  }

  return result;
};

// -----------------------------------------------------------------
// Example usage
// -----------------------------------------------------------------
const nums = [1, 2, 3, 4];

const doubled = nums.myMap((n) => n * 2);
console.log(doubled); // [2, 4, 6, 8]
console.log(nums);    // [1, 2, 3, 4]  -> original unchanged

const withIndex = nums.myMap((n, i) => `${i}:${n}`);
console.log(withIndex); // ['0:1', '1:2', '2:3', '3:4']

/*
  TIME COMPLEXITY: O(n) - one pass through the array.
  SPACE COMPLEXITY: O(n) - a new array is created and returned.
*/
