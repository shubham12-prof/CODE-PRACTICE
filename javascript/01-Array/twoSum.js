function twoSum(nums, target) {
    // Create an empty object to store numbers we've already seen
    let map = {};

    // Loop through every element of the array
    for (let i = 0; i < nums.length; i++) {

        // Find the number needed to reach the target
        let complement = target - nums[i];

        // Check if that number already exists in our object
        if (map.hasOwnProperty(complement)) {

            // If yes, return both indexes
            return [map[complement], i];
        }

        // Store current number as key and its index as value
        map[nums[i]] = i;
    }

    // Return empty array if no pair found
    return [];
}

console.log(twoSum([2, 7, 11, 15], 9));