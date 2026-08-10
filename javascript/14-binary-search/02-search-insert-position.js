/*
  14. Binary Search
  Search Insert Position

  PROBLEM: given a SORTED array and a target, return the index if the
  target is found. If NOT found, return the index where it WOULD be
  inserted to keep the array sorted.
  Example: [1,3,5,6], target=5 -> 2   (found, at index 2)
           [1,3,5,6], target=2 -> 1   (not found, would go between 1 and 3)
           [1,3,5,6], target=7 -> 4   (not found, would go at the very end)

  WHY BINARY SEARCH FITS: this is a normal binary search, but instead
  of returning -1 when not found, we return "left" at the very end -
  which naturally lands exactly on the correct insert position. This
  works because of HOW the left/right pointers move during the search.
*/

function searchInsert(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (nums[mid] === target) {
      return mid; // found it exactly
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  // Not found - by the time the loop ends, "left" has naturally moved
  // to the exact position where target should be inserted.
  return left;
}

console.log(searchInsert([1, 3, 5, 6], 5)); // 2  (found)
console.log(searchInsert([1, 3, 5, 6], 2)); // 1  (insert between 1 and 3)
console.log(searchInsert([1, 3, 5, 6], 7)); // 4  (insert at the end)
console.log(searchInsert([1, 3, 5, 6], 0)); // 0  (insert at the very start)

/*
  WHY "left" ENDS UP AT THE RIGHT SPOT (the tricky part to explain):
  Every time we move left forward (left = mid+1), it's because
  nums[mid] < target - meaning everything up to and including mid is
  too small. Every time we move right backward (right = mid-1), it's
  because nums[mid] > target - meaning mid itself is too big to be
  target's position. When the loop ends (left > right), "left" is
  sitting exactly at the first index where a value >= target could go.

  WALKTHROUGH for [1,3,5,6], target=2:
  left=0, right=3: mid=1, nums[1]=3. 3 > 2 -> right=0.
  left=0, right=0: mid=0, nums[0]=1. 1 < 2 -> left=1.
  left=1, right=0: loop ends (left > right). Return left = 1. ✅

  TIME COMPLEXITY: O(log n)
  SPACE COMPLEXITY: O(1)
*/
