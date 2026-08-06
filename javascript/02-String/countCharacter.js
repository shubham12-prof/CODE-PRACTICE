function countCharacter(str, target) {

    // Counter
    let count = 0;

    // Loop through string
    for (let char of str) {

        // Compare characters
        if (char === target) {
            count++;
        }
    }

    return count;
}

console.log(countCharacter("javascript", "a"));