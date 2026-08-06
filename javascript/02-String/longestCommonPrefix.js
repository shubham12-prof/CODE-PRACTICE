function longestCommonPrefix(words) {

    // Assume first word is prefix
    let prefix = words[0];

    // Loop through remaining words
    for (let i = 1; i < words.length; i++) {

        // Reduce prefix until match
        while (!words[i].startsWith(prefix)) {
            prefix = prefix.slice(0, -1);
        }
    }

    return prefix;
}

console.log(longestCommonPrefix(["flower", "flow", "flight"]));