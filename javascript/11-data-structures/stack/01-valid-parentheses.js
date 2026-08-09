/*
  11. Data Structures - Stack
  Valid Parentheses

  PROBLEM: given a string of brackets like "()[]{}", check if every
  opening bracket has a matching closing bracket, in the correct order.
  Example: "()"    -> true
           "([)]"  -> false (wrong order)
           "{[]}"  -> true

  WHY A STACK FITS: the LAST opening bracket must be the FIRST one
  closed (Last In, First Out). That's exactly what a stack does - push
  opening brackets, and when you see a closing bracket, check if it
  matches whatever is on TOP of the stack.
*/

function isValid(s) {
  const stack = []; // in JS, a plain array works as a stack (push/pop)

  // Map each closing bracket to its matching opening bracket.
  const pairs = {
    ")": "(",
    "]": "[",
    "}": "{",
  };

  for (const char of s) {
    if (char === "(" || char === "[" || char === "{") {
      // It's an opening bracket - push it onto the stack.
      stack.push(char);
    } else {
      // It's a closing bracket - the TOP of the stack must match it.
      const top = stack.pop(); // removes and returns the last item
      if (top !== pairs[char]) {
        return false; // mismatch, or stack was empty (nothing to pop)
      }
    }
  }

  // If the stack is empty at the end, every bracket was matched.
  // If something is still left on the stack, some bracket never closed.
  return stack.length === 0;
}

console.log(isValid("()"));     // true
console.log(isValid("()[]{}")); // true
console.log(isValid("(]"));     // false
console.log(isValid("([)]"));   // false
console.log(isValid("{[]}"));   // true

/*
  TIME COMPLEXITY: O(n) - we look at each character once.
  SPACE COMPLEXITY: O(n) - worst case, stack holds all characters
  (e.g. "((((((" has no closing brackets at all).
*/
