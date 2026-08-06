function groupAnagrams(words) {

    // Store grouped anagrams
    let map = {};

    // Loop through words
    for (let word of words) {

        // Sort letters to create key
        let key = word.split("").sort().join("");

        // Create array if not present
        if (!map[key]) {
            map[key] = [];
        }

        // Add word to group
        map[key].push(word);
    }

    // Return grouped values
    return Object.values(map);
}

console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));