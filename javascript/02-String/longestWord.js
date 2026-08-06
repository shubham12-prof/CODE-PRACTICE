function longestWord(sentence) {

    // Split sentence into words
    let words = sentence.split(" ");

    // Assume first word is longest
    let longest = words[0];

    // Loop through words
    for (let word of words) {

        // Update longest word
        if (word.length > longest.length) {
            longest = word;
        }
    }

    return longest;
}

console.log(longestWord("I Love JavaScript Programming"));