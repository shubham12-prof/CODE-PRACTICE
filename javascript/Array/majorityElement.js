function majorityElement(nums) {

    // Candidate element
    let candidate;

    // Counter
    let count = 0;

    // Traverse array
    for (let num of nums) {

        // Choose new candidate
        if (count === 0) {
            candidate = num;
        }

        // Increase or decrease count
        count += (num === candidate) ? 1 : -1;
    }

    // Return majority element
    return candidate;
}

console.log(majorityElement([2, 2, 1, 1, 1, 2, 2]));