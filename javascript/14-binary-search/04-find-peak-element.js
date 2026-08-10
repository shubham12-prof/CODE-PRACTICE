/*
  14. Binary Search
  Find Peak Element

  PROBLEM: a "peak" is an element that is STRICTLY GREATER than its
  neighbors. Given an array (NOT necessarily sorted), find the index
  of ANY peak. Assume nums[-1] and nums[n] are treated as -Infinity
  (so the very first/last element can also be a peak if it's bigger
  than its one real neighbor). There can be multiple valid peaks -
  returning any one of them is fine.
  Example: [1,2,3,1] -> 2   (index of value 3, since 3 > 2 and 3 > 1)

  WHY BINARY SEARCH FITS (this one's a bit less obvious): even though
  the array isn't sorted, we can still use the middle element to decide
  which HALF to search:
  - If nums[mid] < nums[mid+1], the array is "going uphill" at mid, so
    a peak MUST exist somewhere to the right (worst case, the very
    last element is the peak, since it's compared against -Infinity).
  - If nums[mid] > nums[mid+1], the array is "going downhill" at mid,
    so a peak MUST exist at mid or somewhere to the left.
  Either way, we can always safely eliminate half the array.
*/

function findPeakElement(nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);

    if (nums[mid] < nums[mid + 1]) {
      // Still climbing uphill - peak is to the right of mid (mid itself
      // can't be the peak since its right neighbor is bigger).
      left = mid + 1;
    } else {
      // Either at a peak, or going downhill - peak is at mid or to the
      // left, so keep mid in the search range (don't do mid-1 here).
      right = mid;
    }
  }

  // When left === right, we've narrowed down to exactly one peak index.
  return left;
}

console.log(findPeakElement([1, 2, 3, 1]));       // 2  (value 3 is the peak)
console.log(findPeakElement([1, 2, 1, 3, 5, 6, 4])); // 1 or 5 (both valid peaks)

/*
  WALKTHROUGH for [1,2,3,1]:
  left=0, right=3: mid=1, nums[1]=2, nums[2]=3. 2 < 3 -> uphill, left=2.
  left=2, right=3: mid=2, nums[2]=3, nums[3]=1. 3 > 1 -> downhill/peak,
                    right=mid=2.
  left=2, right=2: loop ends (left === right). Return 2. ✅ (value 3)

  TIME COMPLEXITY: O(log n) - still halves the search space each step.
  SPACE COMPLEXITY: O(1)
*/
