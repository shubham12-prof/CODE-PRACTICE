function findDuplicate(nums) {

    // Store visited numbers
    let set = new Set();

    // Traverse array
    for (let num of nums) {

        // Duplicate found
        if (set.has(num)) {
            return num;
        }

        // Store number
        set.add(num);
    }
}

console.log(findDuplicate([1, 3, 4, 2, 2]));