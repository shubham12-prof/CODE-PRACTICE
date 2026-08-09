/*
  11. Data Structures - Queue
  Circular Queue

  PROBLEM: implement a fixed-size queue that REUSES empty spots at the
  front of the array once items are removed, instead of wasting space.

  WHY "CIRCULAR": a normal array-based queue keeps shifting everything
  left after a removal (shift() is O(n), slow), or just keeps growing
  and wastes memory. A circular queue instead treats the array like a
  circle - front and rear "wrap around" back to index 0 using modulo (%).
*/

class CircularQueue {
  constructor(capacity) {
    this.items = new Array(capacity);
    this.capacity = capacity;
    this.front = 0;  // index of the first (oldest) item
    this.rear = -1;  // index of the last (newest) item
    this.size = 0;   // how many items are currently in the queue
  }

  enqueue(value) {
    if (this.size === this.capacity) {
      console.log("Queue is full");
      return false;
    }

    // Move rear forward, wrapping around to 0 if we hit the end.
    this.rear = (this.rear + 1) % this.capacity;
    this.items[this.rear] = value;
    this.size++;
    return true;
  }

  dequeue() {
    if (this.size === 0) {
      console.log("Queue is empty");
      return null;
    }

    const value = this.items[this.front];

    // Move front forward, wrapping around to 0 if we hit the end.
    this.front = (this.front + 1) % this.capacity;
    this.size--;
    return value;
  }

  peek() {
    if (this.size === 0) return null;
    return this.items[this.front];
  }

  isFull() {
    return this.size === this.capacity;
  }

  isEmpty() {
    return this.size === 0;
  }
}

// Example usage:
const cq = new CircularQueue(3);
cq.enqueue(10);
cq.enqueue(20);
cq.enqueue(30);
console.log(cq.enqueue(40)); // false -> "Queue is full"

console.log(cq.dequeue()); // 10  (frees up a slot)
console.log(cq.enqueue(40)); // true -> reuses the freed slot instead of growing
console.log(cq.peek());    // 20  (next item to come out)

/*
  WHY THE % (modulo) MATTERS:
  Say capacity=3 and rear is at index 2 (the last valid index). The
  next enqueue should go to index 0, NOT index 3 (which doesn't exist).
  (rear + 1) % capacity = (2 + 1) % 3 = 0 -> correctly wraps back around.

  TIME COMPLEXITY: O(1) for enqueue, dequeue, and peek - no shifting
  of other elements needed, unlike a plain array queue using shift().
  SPACE COMPLEXITY: O(n) - fixed size array of "capacity" length.
*/
