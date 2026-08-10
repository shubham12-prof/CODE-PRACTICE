/*
  13. Two Pointers
  3Sum

  PROBLEM: given an array of numbers, find ALL unique triplets
  [a, b, c] such that a + b + c === 0. No duplicate triplets allowed
  in the result.
  Example: [-1, 0, 1, 2, -1, -4] -> [[-1, -1, 2], [-1, 0, 1]]

  WHY TWO POINTERS FIT: this builds directly on "Sorted Two Sum". We
  first SORT the array. Then, we fix ONE number at a time (loop through
  it), and for the REMAINING part of the array, we use the two-pointer
  technique to find pairs that sum to the NEGATIVE of that fixed number
  (since a+b+c=0 means b+c = -a). This turns an O(n^3) brute-force
  triple-nested-loop into O(n^2).
*/

function threeSum(nums) {
  const result = [];

  // Step 1: SORT first - this is what makes two pointers possible,
  // AND makes it easy to skip duplicate values.
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length - 2; i++) {
    // Skip duplicate "first numbers" to avoid duplicate triplets.
    // (if nums[i] is the same as the previous one, we'd just find the
    // same triplets again)
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    // Small optimization: if the smallest number here is already > 0,
    // no triplet starting from here can ever sum to 0 (since the rest
    // are sorted and only get bigger).
    if (nums[i] > 0) break;

    let left = i + 1;
    let right = nums.length - 1;
    const target = -nums[i]; // we need nums[left] + nums[right] === target

    while (left < right) {
      const sum = nums[left] + nums[right];

      if (sum === target) {
        result.push([nums[i], nums[left], nums[right]]);

        // Skip duplicates for "left" and "right" too, so we don't add
        // the same triplet again.
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;

        left++;
        right--;
      } else if (sum < target) {
        left++; // sum too small, need a bigger number
      } else {
        right--; // sum too big, need a smaller number
      }
    }
  }

  return result;
}

console.log(threeSum([-1, 0, 1, 2, -1, -4]));
// [ [ -1, -1, 2 ], [ -1, 0, 1 ] ]

console.log(threeSum([0, 0, 0]));
// [ [ 0, 0, 0 ] ]

console.log(threeSum([0, 1, 1]));
// []  (no triplet sums to 0)

/*
  WALKTHROUGH (high level) for sorted [-4,-1,-1,0,1,2]:
  i=0 (-4): target=4. two-pointer search on [-1,-1,0,1,2] finds nothing
            that sums to 4 (max possible is 1+2=3).
  i=1 (-1): target=1. two-pointer on [-1,0,1,2]:
            left=-1,right=2: sum=1 -> MATCH! push [-1,-1,2].
            left=0,right=1: sum=1 -> MATCH! push [-1,0,1].
  i=2 (-1): same as nums[1] (-1) -> SKIP (duplicate, would repeat i=1's work).
  i=3 (0): nums[3]=0, not > 0, continue but no valid pair found after it.
  Final: [[-1,-1,2],[-1,0,1]]

  TIME COMPLEXITY: O(n^2) - outer loop is O(n), inner two-pointer scan
  is O(n) for each outer iteration. Sorting is O(n log n), which is
  smaller than O(n^2), so it doesn't change the overall complexity.
  SPACE COMPLEXITY: O(1) extra (ignoring the output array itself) -
  we sort in place and only use a few pointer variables.
*/
