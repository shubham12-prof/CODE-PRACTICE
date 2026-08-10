/*
  14. Binary Search
  Search in Rotated Sorted Array

  PROBLEM: a sorted array has been "rotated" at some unknown pivot
  point (e.g. [4,5,6,7,0,1,2] was originally [0,1,2,4,5,6,7], rotated).
  Find the index of a target value. Return -1 if not found.
  Example: [4,5,6,7,0,1,2], target=0 -> 4

  WHY BINARY SEARCH STILL FITS: even though the WHOLE array isn't
  sorted anymore, at least ONE HALF of it (left half or right half,
  split at "mid") is ALWAYS still sorted, because a single rotation
  only breaks the order in one place. So at each step, we figure out
  WHICH half is sorted, check if target falls within that sorted
  half's range, and narrow down accordingly - same O(log n) idea.
*/

function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (nums[mid] === target) {
      return mid;
    }

    // Figure out which half is sorted: compare nums[left] and nums[mid].
    if (nums[left] <= nums[mid]) {
      // LEFT half (left...mid) is sorted normally.
      if (nums[left] <= target && target < nums[mid]) {
        // target is within the sorted left half's range - search there.
        right = mid - 1;
      } else {
        // target must be in the (unsorted-looking) right half.
        left = mid + 1;
      }
    } else {
      // RIGHT half (mid...right) is sorted normally instead.
      if (nums[mid] < target && target <= nums[right]) {
        // target is within the sorted right half's range - search there.
        left = mid + 1;
      } else {
        // target must be in the left half.
        right = mid - 1;
      }
    }
  }

  return -1; // not found
}

console.log(search([4, 5, 6, 7, 0, 1, 2], 0)); // 4
console.log(search([4, 5, 6, 7, 0, 1, 2], 3)); // -1 (not present)
console.log(search([1], 1));                   // 0

/*
  WALKTHROUGH for [4,5,6,7,0,1,2], target=0:
  left=0, right=6: mid=3, nums[3]=7. Not target.
    nums[left]=4 <= nums[mid]=7 -> LEFT half [4,5,6,7] is sorted.
    Is target(0) between 4 and 7? No -> target must be in right half.
    left = mid+1 = 4.
  left=4, right=6: mid=5, nums[5]=1. Not target.
    nums[left]=0 <= nums[mid]=1 -> LEFT half [0,1] is sorted.
    Is target(0) between 0 and 1? Yes -> search left half. right=4.
  left=4, right=4: mid=4, nums[4]=0. MATCH! return 4. ✅

  TIME COMPLEXITY: O(log n) - still cuts the search space in half
  every step, just with an extra check to determine which half is sorted.
  SPACE COMPLEXITY: O(1)
*/
