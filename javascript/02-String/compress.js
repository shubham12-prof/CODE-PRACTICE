function compress(str) {

    // Store compressed string
    let result = "";

    // Counter
    let count = 1;

    // Loop through string
    for (let i = 0; i < str.length; i++) {

        // Count same characters
        if (str[i] === str[i + 1]) {
            count++;
        } else {

            // Add character and count
            result += str[i] + count;

            // Reset counter
            count = 1;
        }
    }

    return result;
}

console.log(compress("aaabbcccc"));