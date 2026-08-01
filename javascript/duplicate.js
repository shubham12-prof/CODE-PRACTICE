const duplicate = [1, 1, 1, 2, 3, 3, 4, 5, 6, 6];

function findDuplicate() {
    let dups = [];

    for (let i = 0; i < duplicate.length; i++) {
        for (let j = i + 1; j < duplicate.length; j++) {
            if (duplicate[i] === duplicate[j] && !dups.includes(duplicate[i])) {
                dups.push(duplicate[i]);
            }
        }
    }

    console.log(dups);
}

findDuplicate();

// optimized solution
function findDuplicates(arr) {
    let seen = new Set();
    let duplicates = new Set();

    for (let num of arr) {
        if (seen.has(num)) {
            duplicates.add(num);
        } else {
            seen.add(num);
        }
    }

    console.log([...duplicates]);
}

findDuplicates([1, 2, 3, 2, 4, 5, 1]);