/*
  14. Binary Search
  Binary Search (classic)

  PROBLEM: given a SORTED array and a target, find the target's index.
  Return -1 if it's not found.
  Example: [-1,0,3,5,9,12], target=9 -> 4

  WHY BINARY SEARCH FITS: because the array is sorted, we can repeatedly
  check the MIDDLE element and immediately eliminate HALF the remaining
  array - if target is bigger than the middle, it can only be in the
  right half; if smaller, only in the left half. This is what makes it
  O(log n) instead of O(n) (checking one by one).
*/

function binarySearch(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    // Using left + (right-left)/2 instead of (left+right)/2 avoids a
    // theoretical integer overflow in some languages - good habit,
    // though not a real issue in JS with normal-sized arrays.
    const mid = left + Math.floor((right - left) / 2);

    if (nums[mid] === target) {
      return mid; // found it
    } else if (nums[mid] < target) {
      left = mid + 1; // target must be in the RIGHT half
    } else {
      right = mid - 1; // target must be in the LEFT half
    }
  }

  return -1; // left > right means the search space is empty - not found
}

console.log(binarySearch([-1, 0, 3, 5, 9, 12], 9));  // 4
console.log(binarySearch([-1, 0, 3, 5, 9, 12], 2));  // -1 (not present)

/*
  WALKTHROUGH for [-1,0,3,5,9,12], target=9:
  left=0, right=5: mid=2, nums[2]=3. 3 < 9 -> search right half: left=3.
  left=3, right=5: mid=4, nums[4]=9. MATCH! return 4.

  TIME COMPLEXITY: O(log n) - the search space is cut in half every step.
  SPACE COMPLEXITY: O(1) - no extra data structures, just a few variables.
*/
