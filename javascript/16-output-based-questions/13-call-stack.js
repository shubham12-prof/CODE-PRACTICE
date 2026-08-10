/*
  16. Output-Based Questions
  Call Stack

  CORE IDEA: the call stack tracks WHICH function is currently running,
  and which functions are "waiting" for other functions they called to
  finish. It works LIFO (Last In, First Out) - the most recently called
  function is the first one to finish and get removed from the stack.
*/

// -----------------------------------------------------------------
// Example 1: basic call stack order
// -----------------------------------------------------------------
function first() {
  console.log("first: start");
  second();
  console.log("first: end");
}

function second() {
  console.log("second: start");
  third();
  console.log("second: end");
}

function third() {
  console.log("third: start");
  console.log("third: end");
}

first();

/*
  EXPECTED OUTPUT:
    first: start
    second: start
    third: start
    third: end
    second: end
    first: end

  WHY: the call stack grows as first() calls second() calls third()
  (stack: [first, second, third]). third() finishes FIRST (LIFO), then
  second() finishes, then first() finishes - the exact REVERSE order
  of how they were called.
*/


// -----------------------------------------------------------------
// Example 2: recursion and the call stack - each recursive call adds
// a NEW frame to the stack
// -----------------------------------------------------------------
function countDown(n) {
  console.log("entering countDown with n =", n);
  if (n <= 0) {
    console.log("base case reached");
    return;
  }
  countDown(n - 1);
  console.log("exiting countDown with n =", n);
}

countDown(3);

/*
  EXPECTED OUTPUT:
    entering countDown with n = 3
    entering countDown with n = 2
    entering countDown with n = 1
    entering countDown with n = 0
    base case reached
    exiting countDown with n = 1
    exiting countDown with n = 2
    exiting countDown with n = 3

  WHY: the stack keeps GROWING with each recursive call (all "waiting"
  for the one below them to finish). Once the base case is hit, calls
  start popping off the stack in REVERSE order, running their
  remaining code (the "exiting..." lines) as they go.
*/


// -----------------------------------------------------------------
// Example 3: "Maximum call stack size exceeded" - what happens
// without a base case
// -----------------------------------------------------------------
function infiniteRecursion() {
  return infiniteRecursion(); // no base case - keeps calling itself forever
}

// infiniteRecursion(); // ❌ RangeError: Maximum call stack size exceeded
// The stack has a LIMITED size - too many nested calls without ever
// finishing/returning will eventually overflow it, crashing the program.


// -----------------------------------------------------------------
// Example 4: async code and the call stack - async callbacks are NOT
// on the call stack while they wait, they run LATER via the event loop
// -----------------------------------------------------------------
function syncTask() {
  console.log("sync task");
}

function asyncTask() {
  setTimeout(() => {
    console.log("async task (from event loop, not the original stack)");
  }, 0);
}

console.log("start");
asyncTask(); // this call FINISHES immediately (setTimeout just
             // schedules something, it doesn't block) - the callback
             // itself runs LATER, once the call stack is empty
syncTask();
console.log("end");

/*
  EXPECTED OUTPUT:
    start
    sync task
    end
    async task (from event loop, not the original stack)
  WHY: asyncTask() returns immediately after SCHEDULING the timer - it
  doesn't wait around on the stack. The actual callback only runs once
  the call stack is completely empty AND the event loop picks it up
  from the macrotask queue (see the event-loop files for full detail).
*/
