/*
  11. Data Structures - HashMap
  Two Sum

  PROBLEM: given an array of numbers and a target, find the indices of
  the two numbers that ADD UP to the target.
  Example: nums = [2, 7, 11, 15], target = 9 -> [0, 1]  (2 + 7 = 9)

  WHY A HASHMAP FITS: the brute-force way checks every PAIR of numbers
  (O(n^2) - slow). Instead, as we walk through the array ONCE, we ask
  "have I already seen the number that would complete THIS pair?" - a
  hashmap answers that instantly (O(1) lookup), so the whole thing
  becomes O(n).
*/

function twoSum(nums, target) {
  const seen = {}; // maps: { number: indexWhereItWasFound }

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i]; // what number would complete the pair?

    // Have we already seen that complement earlier in the array?
    if (complement in seen) {
      return [seen[complement], i];
    }

    // We haven't found a match yet - remember THIS number for later.
    seen[nums[i]] = i;
  }

  return []; // no valid pair found
}

console.log(twoSum([2, 7, 11, 15], 9));  // [0, 1]   (2 + 7 = 9)
console.log(twoSum([3, 2, 4], 6));       // [1, 2]   (2 + 4 = 6)
console.log(twoSum([3, 3], 6));          // [0, 1]   (3 + 3 = 6)

/*
  WALKTHROUGH for nums=[2,7,11,15], target=9:
  i=0, nums[0]=2, complement = 9-2 = 7. Is 7 in seen? No.
       Remember: seen = { 2: 0 }
  i=1, nums[1]=7, complement = 9-7 = 2. Is 2 in seen? YES (at index 0)!
       Return [0, 1] ✅

  Notice we found the answer by looking BACKWARD at numbers we already
  saw, not by comparing every pair - that's the key insight.

  TIME COMPLEXITY: O(n) - single pass through the array.
  SPACE COMPLEXITY: O(n) - worst case, we store every number in "seen"
  before finding a match.
*/
