function findKthLargest(nums, k) {

    // Sort array in descending order
    nums.sort((a, b) => b - a);

    // Return kth largest element
    return nums[k - 1];
}

console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2));