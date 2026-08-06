function countVowels(str) {

    // Define all vowels
    let vowels = "aeiouAEIOU";

    // Counter
    let count = 0;

    // Loop through every character
    for (let char of str) {

        // Check if character is vowel
        if (vowels.includes(char)) {
            count++;
        }
    }

    // Return total vowels
    return count;
}

console.log(countVowels("JavaScript"));