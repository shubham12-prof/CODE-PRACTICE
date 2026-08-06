function maxSubArray(nums) {

    // Current sum starts from first element
    let currentSum = nums[0];

    // Maximum sum starts from first element
    let maxSum = nums[0];

    // Start from second element
    for (let i = 1; i < nums.length; i++) {

        // Either start new subarray or continue old one
        currentSum = Math.max(nums[i], currentSum + nums[i]);

        // Update maximum sum
        maxSum = Math.max(maxSum, currentSum);
    }

    // Return answer
    return maxSum;
}

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));