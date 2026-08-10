/*
  12. Sliding Window
  Minimum Size Subarray Sum

  PROBLEM: given an array of positive numbers and a target sum, find
  the length of the SHORTEST contiguous subarray whose sum is >=
  target. If no such subarray exists, return 0.
  Example: [2,3,1,2,4,3], target=7 -> 2   ([4,3] sums to 7, length 2)

  WHY SLIDING WINDOW FITS: this is a "variable size" window problem.
  We GROW the window (move right) to build up the sum. Once the sum
  is >= target, we try to SHRINK it from the left as much as possible
  while still keeping sum >= target - this finds the smallest valid
  window ending at that point, before growing again.
*/

function minSubArrayLen(target, nums) {
  let left = 0;
  let windowSum = 0;
  let minLength = Infinity; // start as "infinitely large", we'll shrink it down

  for (let right = 0; right < nums.length; right++) {
    windowSum += nums[right]; // grow the window by including nums[right]

    // While the current window's sum already meets the target, try to
    // shrink it from the left to see if a SMALLER window still works.
    while (windowSum >= target) {
      minLength = Math.min(minLength, right - left + 1);
      windowSum -= nums[left]; // remove the leftmost element
      left++;                   // shrink the window
    }
  }

  // If minLength never changed from Infinity, no valid subarray existed.
  return minLength === Infinity ? 0 : minLength;
}

console.log(minSubArrayLen(7, [2, 3, 1, 2, 4, 3])); // 2  ([4,3])
console.log(minSubArrayLen(4, [1, 4, 4]));          // 1  ([4])
console.log(minSubArrayLen(11, [1, 1, 1, 1, 1]));   // 0  (sum never reaches 11)

/*
  WALKTHROUGH for target=7, [2,3,1,2,4,3]:
  right=0: sum=2. Not >= 7 yet.
  right=1: sum=5. Not >= 7 yet.
  right=2: sum=6. Not >= 7 yet.
  right=3: sum=8. >= 7! minLength = min(Inf, 4) = 4. Shrink: sum -= 2 -> 6, left=1.
           Now sum=6, not >= 7, stop shrinking.
  right=4: sum=6+4=10. >= 7! minLength = min(4, 4) = 4. Shrink: sum -= 3 -> 7, left=2.
           Still >= 7! minLength = min(4, 3) = 3. Shrink: sum -= 1 -> 6, left=3.
           Now sum=6, not >= 7, stop shrinking.
  right=5: sum=6+3=9. >= 7! minLength = min(3, 3) = 3. Shrink: sum -= 2 -> 7, left=4.
           Still >= 7! minLength = min(3, 2) = 2. Shrink: sum -= 4 -> 3, left=5.
           Now sum=3, not >= 7, stop.
  Final answer: 2

  TIME COMPLEXITY: O(n) - "right" moves forward n times, "left" moves
  forward at most n times total, never resets backward.
  SPACE COMPLEXITY: O(1) - only a few tracking variables.
*/
