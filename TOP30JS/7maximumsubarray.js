function maxSubArray(nums) {
    let currentSum = nums[0]; // running sum of the "best subarray ending HERE"
    let maxSum = nums[0];     // best sum found so far, anywhere

    for (let i = 1; i < nums.length; i++) {
        // Either extend the previous subarray, or start fresh at nums[i] -
        // whichever gives a bigger sum.
        currentSum = Math.max(nums[i], currentSum + nums[i]);

        // Track the overall best, across all positions.
        maxSum = Math.max(maxSum, currentSum);
    }

    return maxSum;
}

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6
console.log(maxSubArray([1]));                              // 1
console.log(maxSubArray([-1, -2, -3]));                     // -1 (best is just the single least-negative number)
