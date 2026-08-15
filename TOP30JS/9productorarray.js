function productExceptSelf(nums) {
    const n = nums.length;
    const result = new Array(n).fill(1);

    // PASS 1: fill result[i] with the product of everything to the LEFT of i.
    let leftProduct = 1;
    for (let i = 0; i < n; i++) {
        result[i] = leftProduct;
        leftProduct *= nums[i]; // update for the NEXT index
    }

    // PASS 2: multiply result[i] by the product of everything to the
    // RIGHT of i (going backward this time).
    let rightProduct = 1;
    for (let i = n - 1; i >= 0; i--) {
        result[i] *= rightProduct;
        rightProduct *= nums[i]; // update for the NEXT (previous) index
    }

    return result;
}

console.log(productExceptSelf([1, 2, 3, 4])); // [24, 12, 8, 6]
console.log(productExceptSelf([-1, 1, 0, -3, 3])); // [0, 0, 9, 0, 0]