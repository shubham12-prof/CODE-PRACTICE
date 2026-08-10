/*
  13. Two Pointers
  Two Sum (on a SORTED array)

  PROBLEM: given a SORTED array and a target, find the indices of two
  numbers that add up to the target. (Note: this is different from the
  HashMap version of Two Sum - this one takes advantage of the array
  already being SORTED.)
  Example: [2, 7, 11, 15], target=9 -> [0, 1]   (2 + 7 = 9)

  WHY TWO POINTERS FIT: because the array is sorted, we can start with
  one pointer at the FIRST element (smallest) and one at the LAST
  (largest). If their sum is too small, we need a BIGGER number, so we
  move the left pointer right. If their sum is too big, we need a
  SMALLER number, so we move the right pointer left. This narrows down
  to the answer in one pass, without needing extra memory like a
  hashmap would.
*/

function twoSumSorted(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const sum = nums[left] + nums[right];

    if (sum === target) {
      return [left, right]; // found it!
    } else if (sum < target) {
      // Sum is too small - we need a bigger number, move left pointer
      // rightward (toward larger values, since array is sorted).
      left++;
    } else {
      // Sum is too big - we need a smaller number, move right pointer
      // leftward (toward smaller values).
      right--;
    }
  }

  return []; // no valid pair found
}

console.log(twoSumSorted([2, 7, 11, 15], 9));  // [0, 1]  (2+7=9)
console.log(twoSumSorted([1, 2, 3, 4, 6], 6)); // [1, 3]  (2+4=6)
console.log(twoSumSorted([2, 3, 4], 6));       // [0, 2]  (2+4=6)

/*
  WALKTHROUGH for [2,7,11,15], target=9:
  left=0(2), right=3(15): sum=17, too big -> move right left. right=2.
  left=0(2), right=2(11): sum=13, too big -> move right left. right=1.
  left=0(2), right=1(7):  sum=9, MATCH! return [0, 1] ✅

  WHY THIS ONLY WORKS ON A SORTED ARRAY: the "move left if too small,
  move right if too big" logic relies entirely on knowing which
  direction makes the sum bigger or smaller - which only holds true if
  the values are in sorted order.

  TIME COMPLEXITY: O(n) - left and right pointers move toward each
  other, meeting after at most n steps.
  SPACE COMPLEXITY: O(1) - no extra hashmap needed, unlike the
  unsorted version of Two Sum.
*/
