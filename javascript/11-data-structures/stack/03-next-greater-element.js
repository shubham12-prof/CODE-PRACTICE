/*
  11. Data Structures - Stack
  Next Greater Element

  PROBLEM: for each number in an array, find the NEXT number to its
  right that is GREATER than it. If there isn't one, use -1.
  Example: [2, 1, 2, 4, 3] -> [4, 2, 4, -1, -1]

  WHY A STACK FITS (this is the classic "monotonic stack" pattern):
  We walk through the array and keep a stack of INDICES whose "next
  greater" we haven't found yet. Whenever we see a number bigger than
  whatever is on top of the stack, that new number IS the answer for
  everything smaller sitting on the stack - so we pop them off and
  record the answer, one by one.
*/

function nextGreaterElement(nums) {
  const result = new Array(nums.length).fill(-1); // default: no greater found
  const stack = []; // will store INDICES, not values

  for (let i = 0; i < nums.length; i++) {
    // While the stack isn't empty AND the current number is bigger
    // than the number at the index on top of the stack...
    while (
      stack.length > 0 &&
      nums[i] > nums[stack[stack.length - 1]]
    ) {
      const indexToUpdate = stack.pop();
      result[indexToUpdate] = nums[i]; // found its "next greater" - nums[i]
    }

    // Push the current index - we don't know its next greater yet.
    stack.push(i);
  }

  // Anything still left in the stack at the end never found a next
  // greater element, so it correctly stays -1 (already the default).

  return result;
}

console.log(nextGreaterElement([2, 1, 2, 4, 3]));
// [4, 2, 4, -1, -1]

console.log(nextGreaterElement([4, 3, 2, 1]));
// [-1, -1, -1, -1]  (strictly decreasing - nothing has a next greater)

/*
  WALKTHROUGH for [2, 1, 2, 4, 3]:
  i=0 (2): stack empty, push index 0.        stack: [0]
  i=1 (1): 1 < 2, no pop, push index 1.       stack: [0,1]
  i=2 (2): 2 > nums[1]=1 -> pop 1, result[1]=2
           2 == nums[0]=2, not GREATER, stop popping. push index 2.
                                              stack: [0,2]
  i=3 (4): 4 > nums[2]=2 -> pop 2, result[2]=4
           4 > nums[0]=2 -> pop 0, result[0]=4
           stack empty, push index 3.         stack: [3]
  i=4 (3): 3 < nums[3]=4, no pop, push index 4. stack: [3,4]
  End: indices 3 and 4 never got popped -> stay -1.
  Final result: [4, 2, 4, -1, -1]

  TIME COMPLEXITY: O(n) - even though there's a while loop inside a for
  loop, each index gets pushed once and popped AT MOST once, total.
  SPACE COMPLEXITY: O(n) for the stack and result array.
*/
