function threeSum(nums) {

    // Sort array
    nums.sort((a, b) => a - b);

    // Store answer
    let result = [];

    // Traverse array
    for (let i = 0; i < nums.length - 2; i++) {

        // Skip duplicate values
        if (i > 0 && nums[i] === nums[i - 1]) continue;

        // Left pointer
        let left = i + 1;

        // Right pointer
        let right = nums.length - 1;

        while (left < right) {

            // Calculate sum
            let sum = nums[i] + nums[left] + nums[right];

            if (sum === 0) {

                // Store triplet
                result.push([nums[i], nums[left], nums[right]]);

                // Skip duplicates
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;

                left++;
                right--;

            } else if (sum < 0) {

                // Increase sum
                left++;

            } else {

                // Decrease sum
                right--;
            }
        }
    }

    return result;
}

console.log(threeSum([-1, 0, 1, 2, -1, -4]));