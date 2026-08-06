function reverseWords(str) {

    // Split sentence into words
    let words = str.split(" ");

    // Reverse word order
    words.reverse();

    // Join back into sentence
    return words.join(" ");
}

console.log(reverseWords("I Love JavaScript"));