/*
  12. Sliding Window
  Maximum Sum Subarray (of size K)

  PROBLEM: given an array and a fixed size k, find the MAXIMUM sum of
  any k consecutive elements (a "subarray" of size k).
  Example: [2, 1, 5, 1, 3, 2], k=3 -> 9   (5+1+3 = 9)

  WHY SLIDING WINDOW FITS: the brute-force way recalculates the sum of
  EVERY window of size k from scratch (O(n*k) - slow). But each window
  only differs from the previous one by ONE element leaving (left) and
  ONE element entering (right). So instead of recomputing the whole
  sum, we just SUBTRACT the element that left and ADD the element that
  entered - turning it into O(n).
*/

function maxSubArraySum(arr, k) {
  if (arr.length < k) return null; // not enough elements for a window of size k

  // Step 1: calculate the sum of the FIRST window (indices 0 to k-1).
  let windowSum = 0;
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }

  let maxSum = windowSum; // best sum seen so far

  // Step 2: SLIDE the window one step at a time, from index k to the end.
  for (let i = k; i < arr.length; i++) {
    // Remove the element leaving the window (leftmost of previous window),
    // add the element entering the window (current i).
    windowSum = windowSum - arr[i - k] + arr[i];
    maxSum = Math.max(maxSum, windowSum);
  }

  return maxSum;
}

console.log(maxSubArraySum([2, 1, 5, 1, 3, 2], 3)); // 9  (5+1+3)
console.log(maxSubArraySum([2, 3, 4, 1, 5], 2));    // 7  (3+4)

/*
  WALKTHROUGH for [2, 1, 5, 1, 3, 2], k=3:
  First window (i=0..2): 2+1+5 = 8. maxSum = 8.
  Slide to i=3: windowSum = 8 - arr[0](2) + arr[3](1) = 7. maxSum stays 8.
  Slide to i=4: windowSum = 7 - arr[1](1) + arr[4](3) = 9. maxSum = 9.
  Slide to i=5: windowSum = 9 - arr[2](5) + arr[5](2) = 6. maxSum stays 9.
  Final answer: 9

  TIME COMPLEXITY: O(n) - each element is added once and removed once.
  SPACE COMPLEXITY: O(1) - just a few tracking variables, no extra array.
*/
