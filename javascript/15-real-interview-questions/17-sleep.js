/*
  15. Real Interview Questions
  Implement sleep()

  PROBLEM: create a function that PAUSES execution for a given number
  of milliseconds when used with await - JS has no built-in sleep()
  function like some other languages do, so you build it using a
  Promise wrapped around setTimeout.

  CORE IDEA: return a Promise that resolves automatically after the
  given delay (via setTimeout). Since Promises are awaitable, this lets
  you write "pause-like" code inside an async function.
*/

function sleep(ms) {
  return new Promise((resolve) => {
    // We don't need to actually pass any value to resolve() - we just
    // need SOMETHING to happen after "ms" milliseconds so the Promise
    // settles, letting whoever awaited it continue.
    setTimeout(resolve, ms);
  });
}

// -----------------------------------------------------------------
// Example usage
// -----------------------------------------------------------------
async function demo() {
  console.log("Start");
  await sleep(1000); // pauses here for 1 second
  console.log("1 second later");
  await sleep(2000); // pauses here for 2 more seconds
  console.log("2 more seconds later");
}

demo();
// Start
// (waits 1 second)
// 1 second later
// (waits 2 more seconds)
// 2 more seconds later


// -----------------------------------------------------------------
// Practical use case: adding a delay between retries or steps in a loop
// -----------------------------------------------------------------
async function processItemsSlowly(items) {
  for (const item of items) {
    console.log("Processing:", item);
    await sleep(500); // wait half a second between each item
  }
  console.log("All done!");
}

processItemsSlowly(["A", "B", "C"]);

/*
  WHY THIS WORKS: await pauses an async function until whatever it's
  awaiting RESOLVES. Since our sleep() Promise only resolves after
  setTimeout fires, awaiting it effectively pauses the async function
  for that long - without blocking the rest of the program (other code
  outside this async function keeps running normally in the meantime).
*/
