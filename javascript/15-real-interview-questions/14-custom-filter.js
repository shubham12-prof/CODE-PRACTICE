/*
  15. Real Interview Questions
  Custom filter()

  PROBLEM: implement your own version of Array.prototype.filter() -
  returns a NEW array containing only the elements for which the
  callback returns a TRUTHY value.

  CORE IDEA: loop through the array, call the callback on each item,
  and only push it into the result array if the callback's return
  value is truthy.
*/

Array.prototype.myFilter = function (callback) {
  const result = [];

  for (let i = 0; i < this.length; i++) {
    // Same (element, index, array) signature as the real filter().
    if (callback(this[i], i, this)) {
      result.push(this[i]);
    }
  }

  return result;
};

// -----------------------------------------------------------------
// Example usage
// -----------------------------------------------------------------
const nums = [1, 2, 3, 4, 5, 6];

const evens = nums.myFilter((n) => n % 2 === 0);
console.log(evens); // [2, 4, 6]

const greaterThan3 = nums.myFilter((n) => n > 3);
console.log(greaterThan3); // [4, 5, 6]

console.log(nums); // [1, 2, 3, 4, 5, 6]  -> original unchanged

/*
  TIME COMPLEXITY: O(n) - one pass through the array.
  SPACE COMPLEXITY: O(k) - where k is the number of items that pass
  the test (worst case, k = n if everything passes).
*/
