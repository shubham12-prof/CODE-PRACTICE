function sortColors(nums) {

    // Pointer for 0
    let low = 0;

    // Current pointer
    let mid = 0;

    // Pointer for 2
    let high = nums.length - 1;

    while (mid <= high) {

        if (nums[mid] === 0) {

            // Swap 0 to front
            [nums[low], nums[mid]] = [nums[mid], nums[low]];

            low++;
            mid++;

        } else if (nums[mid] === 1) {

            // Leave 1 in middle
            mid++;

        } else {

            // Swap 2 to end
            [nums[mid], nums[high]] = [nums[high], nums[mid]];

            high--;
        }
    }

    return nums;
}

console.log(sortColors([2, 0, 2, 1, 1, 0]));