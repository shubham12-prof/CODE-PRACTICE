// 1 USING SET
function duplicate(arr) {
    return [...new Set(arr)];
}
console.log(duplicate([1, 2, 3, 2, 1, 3, 4, 2, 1, 2, 3, 4, 2]));

// 2. Brute Force Approach (Nested Loops)
const duplicate = [1, 1, 1, 2, 3, 3, 4, 5, 6, 6];

function findDuplicate() {
    // Stores the duplicate values found
    let dups = [];

    // Compare each element with the remaining elements
    for (let i = 0; i < duplicate.length; i++) {
        for (let j = i + 1; j < duplicate.length; j++) {

            // If two values are the same and the duplicate
            // hasn't already been stored, add it
            if (duplicate[i] === duplicate[j] && !dups.includes(duplicate[i])) {
                dups.push(duplicate[i]);
            }
        }
    }

    console.log(dups);
}

findDuplicate();


// 3 Optimized Approach(Using Set)

function findDuplicates(arr) {

    // Stores numbers we've already seen
    let seen = new Set();

    // Stores duplicate numbers only once
    let duplicates = new Set();

    // Traverse the array only once
    for (let num of arr) {

        // If the number already exists in 'seen',
        // it is a duplicate
        if (seen.has(num)) {
            duplicates.add(num);
        } else {

            // Otherwise, mark it as seen
            seen.add(num);
        }
    }

    // Convert the Set into an array before printing
    console.log([...duplicates]);
}

findDuplicates([1, 2, 3, 2, 4, 5, 1]);