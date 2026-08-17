function isValid(s) {
    const stack = [];
    const pairs = { ")": "(", "]": "[", "}": "{" };

    for (const char of s) {
        if (char === "(" || char === "[" || char === "{") {
            stack.push(char);
        } else {
            const top = stack.pop();
            if (top !== pairs[char]) {
                return false; // mismatch, or nothing left to pop
            }
        }
    }

    return stack.length === 0; // everything got matched and closed
}

console.log(isValid("()[]{}")); // true
console.log(isValid("([)]"));   // false
console.log(isValid("{[]}"));   // true