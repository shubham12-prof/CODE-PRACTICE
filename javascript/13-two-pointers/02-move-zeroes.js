/*
  13. Two Pointers
  Move Zeroes

  PROBLEM: given an array, move all 0s to the END, while keeping the
  RELATIVE ORDER of the non-zero elements the same. Do it IN-PLACE.
  Example: [0,1,0,3,12] -> [1,3,12,0,0]

  WHY TWO POINTERS FIT: same "slow/fast" pattern as Remove Duplicates.
  - "slow" pointer: marks where the next NON-ZERO value should go.
  - "fast" pointer: scans through looking for non-zero values.
  Whenever fast finds a non-zero, we place it at slow's position and
  move slow forward - this naturally pushes all zeroes toward the end.
*/

function moveZeroes(nums) {
  let slow = 0; // next position where a non-zero value should be placed

  for (let fast = 0; fast < nums.length; fast++) {
    if (nums[fast] !== 0) {
      // Swap nums[slow] and nums[fast]. If slow === fast, this is a
      // harmless no-op swap (common in the early part of the array
      // when there are no zeroes yet).
      [nums[slow], nums[fast]] = [nums[fast], nums[slow]];
      slow++;
    }
  }

  return nums; // modified in-place, returned for convenience
}

console.log(moveZeroes([0, 1, 0, 3, 12])); // [1, 3, 12, 0, 0]
console.log(moveZeroes([0, 0, 1]));        // [1, 0, 0]

/*
  WALKTHROUGH for [0,1,0,3,12]:
  slow=0
  fast=0: nums[0]=0 -> skip (it's zero, do nothing).
  fast=1: nums[1]=1, non-zero -> swap nums[0] and nums[1]:
          [1,0,0,3,12]. slow becomes 1.
  fast=2: nums[2]=0 -> skip.
  fast=3: nums[3]=3, non-zero -> swap nums[1] and nums[3]:
          [1,3,0,0,12]. slow becomes 2.
  fast=4: nums[4]=12, non-zero -> swap nums[2] and nums[4]:
          [1,3,12,0,0]. slow becomes 3.
  Final: [1,3,12,0,0] ✅ order of non-zeroes preserved, zeroes pushed to end.

  WHY SWAPPING (not just overwriting) MATTERS: overwriting nums[slow] =
  nums[fast] directly would LOSE whatever value was originally sitting
  at nums[slow] (which might be a zero we still need later, or another
  non-zero we haven't placed yet). Swapping keeps both values safe.

  TIME COMPLEXITY: O(n) - single pass with the fast pointer.
  SPACE COMPLEXITY: O(1) - done entirely in-place.
*/
