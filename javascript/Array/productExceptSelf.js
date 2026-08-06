function productExceptSelf(nums) {

    // Create result array filled with 1
    let result = new Array(nums.length).fill(1);

    // Store multiplication of all left elements
    let left = 1;

    // Traverse from left to right
    for (let i = 0; i < nums.length; i++) {

        // Store left product
        result[i] = left;

        // Update left product
        left *= nums[i];
    }

    // Store multiplication of right elements
    let right = 1;

    // Traverse from right to left
    for (let i = nums.length - 1; i >= 0; i--) {

        // Multiply left and right products
        result[i] *= right;

        // Update right product
        right *= nums[i];
    }

    // Return final result
    return result;
}

console.log(productExceptSelf([1, 2, 3, 4]));