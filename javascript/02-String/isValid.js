function isValid(str) {

    // Stack
    let stack = [];

    // Matching brackets
    let map = {
        ")": "(",
        "]": "[",
        "}": "{"
    };

    // Loop through characters
    for (let char of str) {

        // Opening bracket
        if (char === "(" || char === "[" || char === "{") {

            stack.push(char);

        } else {

            // Compare top of stack
            if (stack.pop() !== map[char]) {
                return false;
            }
        }
    }

    // Stack should be empty
    return stack.length === 0;
}

console.log(isValid("{[()]}"));