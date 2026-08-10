/*
  15. Real Interview Questions
  Flatten Nested Array

  PROBLEM: given an array that can contain other arrays nested inside
  it (to any depth), flatten it into a single, flat array.
  Example: [1, [2, [3, [4, 5]], 6]] -> [1, 2, 3, 4, 5, 6]

  CORE IDEA: recursion. If an item is itself an array, flatten IT
  first, then merge its items in. If it's a plain value, just keep it.
  (Same pattern covered earlier in the Recursion folder - shown again
  here since it's such a common standalone interview question.)
*/

function flatten(arr) {
  let result = [];

  for (const item of arr) {
    if (Array.isArray(item)) {
      // RECURSIVE CASE: flatten the nested array, merge its results in.
      result = result.concat(flatten(item));
    } else {
      // BASE CASE: plain value, just add it directly.
      result.push(item);
    }
  }

  return result;
}

console.log(flatten([1, [2, [3, [4, 5]], 6]]));
// [1, 2, 3, 4, 5, 6]

console.log(flatten([1, 2, [3, 4], [5, [6, 7]]]));
// [1, 2, 3, 4, 5, 6, 7]


// -----------------------------------------------------------------
// Bonus: iterative version using a stack (no recursion, in case an
// interviewer asks for a non-recursive solution)
// -----------------------------------------------------------------
function flattenIterative(arr) {
  const stack = [...arr]; // copy input so we don't mutate the original
  const result = [];

  while (stack.length > 0) {
    const item = stack.pop(); // take from the end

    if (Array.isArray(item)) {
      // Push its contents back onto the stack to be processed too.
      stack.push(...item);
    } else {
      result.push(item);
    }
  }

  // Since we used pop() (from the end), items come out in REVERSE
  // order - reverse the result to restore the original order.
  return result.reverse();
}

console.log(flattenIterative([1, [2, [3, 4]], 5]));
// [1, 2, 3, 4, 5]

/*
  BONUS: JS has a built-in for this too - Array.prototype.flat(depth).
  arr.flat(Infinity) flattens ALL levels, no matter how deep.
  Interviewers usually still want to see you implement it manually
  first, to check you understand recursion/stacks.
*/
