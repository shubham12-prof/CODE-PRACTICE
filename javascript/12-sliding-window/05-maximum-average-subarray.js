/*
  12. Sliding Window
  Maximum Average Subarray (of size K)

  PROBLEM: given an array and a fixed size k, find the MAXIMUM average
  value among all contiguous subarrays of size k.
  Example: [1,12,-5,-6,50,3], k=4 -> 12.75
           (subarray [12,-5,-6,50] sums to 51, 51/4 = 12.75)

  WHY SLIDING WINDOW FITS: this is basically the SAME pattern as
  "Maximum Sum Subarray" - find the max SUM of a fixed-size window
  first (using the slide-and-adjust trick), then just divide that
  max sum by k at the very end to get the average. No need to
  calculate the average for every single window individually.
*/

function findMaxAverage(nums, k) {
  // Step 1: sum of the first window.
  let windowSum = 0;
  for (let i = 0; i < k; i++) {
    windowSum += nums[i];
  }

  let maxSum = windowSum;

  // Step 2: slide the window across the rest of the array.
  for (let i = k; i < nums.length; i++) {
    windowSum = windowSum - nums[i - k] + nums[i]; // remove leaving, add entering
    maxSum = Math.max(maxSum, windowSum);
  }

  // Step 3: only divide by k ONCE, at the end, using the best sum found.
  return maxSum / k;
}

console.log(findMaxAverage([1, 12, -5, -6, 50, 3], 4)); // 12.75
console.log(findMaxAverage([5], 1));                     // 5

/*
  WALKTHROUGH for [1,12,-5,-6,50,3], k=4:
  First window (i=0..3): 1+12-5-6 = 2. maxSum = 2.
  Slide to i=4: windowSum = 2 - nums[0](1) + nums[4](50) = 51. maxSum = 51.
  Slide to i=5: windowSum = 51 - nums[1](12) + nums[5](3) = 42. maxSum stays 51.
  Final: maxSum = 51, average = 51 / 4 = 12.75

  WHY WE DON'T DIVIDE INSIDE THE LOOP: dividing by k every single time
  we update maxSum is unnecessary extra work - since k is CONSTANT for
  every window, whichever window has the biggest SUM will also have
  the biggest AVERAGE. So we only need to divide once, at the end.

  TIME COMPLEXITY: O(n) - one pass to build the first window, one pass
  to slide through the rest.
  SPACE COMPLEXITY: O(1) - just a couple of tracking variables.
*/
