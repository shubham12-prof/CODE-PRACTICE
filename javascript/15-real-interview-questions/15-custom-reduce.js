/*
  15. Real Interview Questions
  Custom reduce()

  PROBLEM: implement your own version of Array.prototype.reduce() -
  boils an entire array down to a SINGLE value, by repeatedly applying
  a callback that combines the "running total" (accumulator) with each
  element, one at a time.

  CORE IDEA: keep an "accumulator" variable. For each element, call the
  callback with (accumulator, currentElement), and whatever it returns
  becomes the NEW accumulator for the next round.
*/

Array.prototype.myReduce = function (callback, initialValue) {
  let accumulator = initialValue;
  let startIndex = 0;

  // If NO initial value was given, use the FIRST element of the array
  // as the starting accumulator, and start looping from index 1
  // instead of 0 (this matches real reduce() behavior).
  if (accumulator === undefined) {
    if (this.length === 0) {
      throw new TypeError("Reduce of empty array with no initial value");
    }
    accumulator = this[0];
    startIndex = 1;
  }

  for (let i = startIndex; i < this.length; i++) {
    // Real reduce() passes (accumulator, currentValue, index, array).
    accumulator = callback(accumulator, this[i], i, this);
  }

  return accumulator;
};

// -----------------------------------------------------------------
// Example usage
// -----------------------------------------------------------------
const nums = [1, 2, 3, 4];

const sum = nums.myReduce((acc, n) => acc + n, 0);
console.log(sum); // 10

const max = nums.myReduce((acc, n) => (n > acc ? n : acc));
console.log(max); // 4  (no initial value given, starts from nums[0]=1)

// A common real-world use: turning an array into a frequency object.
const fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];
const freqCount = fruits.myReduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc;
}, {});
console.log(freqCount); // { apple: 3, banana: 2, orange: 1 }

/*
  WHY reduce() IS SO POWERFUL: map(), filter(), and many other array
  operations can actually be REBUILT using just reduce() - it's often
  called the "swiss army knife" of array methods because it can
  express almost any array-to-value transformation.

  TIME COMPLEXITY: O(n) - one pass through the array.
  SPACE COMPLEXITY: O(1) extra (not counting whatever size the
  accumulator itself grows to, e.g. building up an object).
*/
