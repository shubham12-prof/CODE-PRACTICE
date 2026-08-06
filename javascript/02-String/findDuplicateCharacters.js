function findDuplicateCharacters(str) {

    // Store frequency
    let map = {};

    // Store duplicate characters
    let duplicates = [];

    // Loop through string
    for (let char of str) {

        // Increase frequency
        map[char] = (map[char] || 0) + 1;

        // Store duplicate once
        if (map[char] === 2) {
            duplicates.push(char);
        }
    }

    return duplicates;
}

console.log(findDuplicateCharacters("programming"));