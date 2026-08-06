function decodeString(str) {

    // Stack for numbers
    let numStack = [];

    // Stack for strings
    let strStack = [];

    // Current number
    let num = 0;

    // Current string
    let current = "";

    // Loop through characters
    for (let char of str) {

        // Build multi-digit number
        if (!isNaN(char)) {

            num = num * 10 + Number(char);

        } else if (char === "[") {

            // Store current values
            numStack.push(num);
            strStack.push(current);

            // Reset values
            num = 0;
            current = "";

        } else if (char === "]") {

            // Get repeat count
            let repeat = numStack.pop();

            // Build decoded string
            current = strStack.pop() + current.repeat(repeat);

        } else {

            // Append character
            current += char;
        }
    }

    return current;
}

console.log(decodeString("3[a2[c]]"));