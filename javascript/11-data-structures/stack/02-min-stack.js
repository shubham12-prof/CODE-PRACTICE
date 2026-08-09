/*
  11. Data Structures - Stack
  Min Stack

  PROBLEM: build a stack that supports push, pop, top, AND getMin -
  all in O(1) time. getMin() should return the smallest value currently
  in the stack, instantly, no looping/searching allowed.

  WHY A SECOND STACK FITS: we keep a normal stack for the actual
  values, PLUS a second "minStack" that tracks the minimum-so-far at
  every point in time. Whatever is on top of minStack is always the
  current minimum.
*/

class MinStack {
  constructor() {
    this.stack = [];    // holds all values, normal stack behavior
    this.minStack = [];  // minStack[i] = the minimum value AFTER pushing stack[i]
  }

  push(value) {
    this.stack.push(value);

    // Figure out what the new minimum is after this push.
    // If minStack is empty, this value IS the minimum so far.
    // Otherwise, compare with the current top of minStack.
    const currentMin = this.minStack.length === 0
      ? value
      : Math.min(value, this.minStack[this.minStack.length - 1]);

    this.minStack.push(currentMin);
  }

  pop() {
    // Pop from BOTH stacks together, so they always stay in sync -
    // this keeps minStack's top accurate after removal.
    this.minStack.pop();
    return this.stack.pop();
  }

  top() {
    return this.stack[this.stack.length - 1];
  }

  getMin() {
    // The top of minStack is always the current minimum - O(1), no loop.
    return this.minStack[this.minStack.length - 1];
  }
}

// Example usage:
const minStack = new MinStack();
minStack.push(5);
minStack.push(2);
minStack.push(7);
console.log(minStack.getMin()); // 2

minStack.push(1);
console.log(minStack.getMin()); // 1

minStack.pop(); // removes the 1
console.log(minStack.getMin()); // back to 2

console.log(minStack.top()); // 7

/*
  WHY minStack MUST be pushed/popped alongside stack:
  If we only popped from "stack" but left "minStack" alone, minStack's
  top could point to a minimum that's no longer actually in the stack.
  Keeping them in sync (same length, same push/pop timing) guarantees
  minStack's top always reflects the true minimum of what's currently
  in "stack".

  TIME COMPLEXITY: O(1) for push, pop, top, and getMin - all instant.
  SPACE COMPLEXITY: O(n) - we store an extra value per push in minStack.
*/
