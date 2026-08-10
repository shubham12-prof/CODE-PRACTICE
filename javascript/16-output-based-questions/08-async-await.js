/*
  16. Output-Based Questions
  async/await

  MENTAL MODEL: an async function runs SYNCHRONOUSLY until its first
  "await". At "await", it pauses and gives control back to the caller.
  Whatever comes after "await" runs later, as a microtask.
*/

// -----------------------------------------------------------------
// Example 1: order of execution with multiple awaits
// -----------------------------------------------------------------
async function foo() {
  console.log("foo start");
  await null;
  console.log("foo middle");
  await null;
  console.log("foo end");
}

console.log("script start");
foo();
console.log("script end");

/*
  EXPECTED OUTPUT:
    script start
    foo start
    script end
    foo middle
    foo end
  WHY: foo() runs sync until the first await ("foo start"), then
  pauses. "script end" runs next (still sync, outside foo). Then each
  "await null" resumes as a separate microtask, printing "foo middle"
  and "foo end" in turn, one microtask cycle at a time.
*/


// -----------------------------------------------------------------
// Example 2: try/catch with await - catches PROMISE rejections too
// -----------------------------------------------------------------
async function mayFail() {
  try {
    await Promise.reject(new Error("Something broke"));
    console.log("This line never runs");
  } catch (err) {
    console.log("Caught:", err.message);
  }
}

mayFail(); // "Caught: Something broke"
/*
  WHY: await on a REJECTED promise throws, just like a regular
  synchronous throw - so a normal try/catch around it works perfectly.
*/


// -----------------------------------------------------------------
// Example 3: async functions ALWAYS return a Promise, even for plain values
// -----------------------------------------------------------------
async function getNumber() {
  return 42; // NOT actually returning 42 directly - it's WRAPPED in a Promise
}

console.log(getNumber()); // Promise { 42 }  -> NOT just "42"!
getNumber().then((val) => console.log("value:", val)); // value: 42


// -----------------------------------------------------------------
// Example 4: sequential vs parallel awaits - a common performance trap
// -----------------------------------------------------------------
function delay(value, ms) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

// SEQUENTIAL (slower) - each await waits for the previous one to
// finish before even STARTING the next one.
async function sequential() {
  console.time("sequential");
  const a = await delay("A", 500);
  const b = await delay("B", 500);
  console.timeEnd("sequential"); // ~1000ms total (500 + 500)
  return [a, b];
}

// PARALLEL (faster) - both promises are STARTED at the same time
// (before either await happens), so they run concurrently.
async function parallel() {
  console.time("parallel");
  const promiseA = delay("A", 500); // starts immediately, not awaited yet
  const promiseB = delay("B", 500); // ALSO starts immediately
  const [a, b] = await Promise.all([promiseA, promiseB]);
  console.timeEnd("parallel"); // ~500ms total (both ran at the same time)
  return [a, b];
}

sequential().then((r) => console.log("sequential result:", r));
parallel().then((r) => console.log("parallel result:", r));

/*
  COMMON INTERVIEW POINT: if two async operations DON'T depend on each
  other's results, always start them BOTH first, then await together
  with Promise.all() - awaiting them one at a time wastes time for no
  reason.
*/
