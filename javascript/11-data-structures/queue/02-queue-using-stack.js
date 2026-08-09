/*
  11. Data Structures - Queue
  Queue using Stack(s)

  PROBLEM: implement a Queue (FIFO - First In, First Out) using only
  Stack operations (push/pop, which are LIFO - Last In, First Out).

  WHY TWO STACKS FIT: a single stack reverses order (LIFO), but if you
  pour one stack's items into a SECOND stack, they reverse AGAIN -
  which flips them back into the correct FIFO order. So:
  - stack "in"  -> used for enqueue (adding new items)
  - stack "out" -> used for dequeue (removing oldest item)
*/

class QueueUsingStacks {
  constructor() {
    this.stackIn = [];  // where new items go
    this.stackOut = []; // where items come out from, in correct order
  }

  enqueue(value) {
    // Adding is simple - just push onto "in". O(1).
    this.stackIn.push(value);
  }

  dequeue() {
    // If "out" is empty, we need to refill it from "in".
    if (this.stackOut.length === 0) {
      // Move EVERY item from "in" to "out", one by one. Since stackIn.pop()
      // gives us the MOST recently added item first, and we push each
      // one onto stackOut, the order gets REVERSED - which happens to
      // put the OLDEST item on top of stackOut. Exactly what we want.
      while (this.stackIn.length > 0) {
        this.stackOut.push(this.stackIn.pop());
      }
    }

    if (this.stackOut.length === 0) {
      console.log("Queue is empty");
      return null;
    }

    // The top of "out" is now the OLDEST item - pop it (FIFO achieved).
    return this.stackOut.pop();
  }

  peek() {
    if (this.stackOut.length === 0) {
      while (this.stackIn.length > 0) {
        this.stackOut.push(this.stackIn.pop());
      }
    }
    return this.stackOut.length > 0
      ? this.stackOut[this.stackOut.length - 1]
      : null;
  }

  isEmpty() {
    return this.stackIn.length === 0 && this.stackOut.length === 0;
  }
}

// Example usage:
const q = new QueueUsingStacks();
q.enqueue(1);
q.enqueue(2);
q.enqueue(3);

console.log(q.dequeue()); // 1  (first one added, comes out first - FIFO)
q.enqueue(4);
console.log(q.dequeue()); // 2
console.log(q.dequeue()); // 3
console.log(q.dequeue()); // 4

/*
  WALKTHROUGH:
  enqueue(1), enqueue(2), enqueue(3) -> stackIn = [1, 2, 3]
  dequeue():
    stackOut is empty, so refill it:
      pop 3 from stackIn -> push to stackOut  -> stackOut = [3]
      pop 2 from stackIn -> push to stackOut  -> stackOut = [3, 2]
      pop 1 from stackIn -> push to stackOut  -> stackOut = [3, 2, 1]
    now pop from stackOut -> returns 1 (the oldest item!) ✅

  TIME COMPLEXITY:
  - enqueue: O(1) always.
  - dequeue: O(1) "amortized" - most calls are O(1) since stackOut
    already has items, but occasionally (when stackOut is empty) it
    costs O(n) to transfer everything over. Averaged across many
    calls, it still works out to O(1) per operation.
*/
