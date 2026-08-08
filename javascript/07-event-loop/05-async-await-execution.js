/*
  7.5 EVENT LOOP - async/await Execution

  MENTAL MODEL: an async function runs SYNCHRONOUSLY line by line until
  it hits the first `await`. At `await`, it pauses and hands control
  back to the caller. Code AFTER `await` runs later, as a microtask -
  it's basically a `.then()` in disguise.
*/

console.log("1: start");

async function myFunction() {
  console.log("2: inside async function, before await");
  await null; // pause point
  console.log("4: inside async function, after await (microtask)");
}

myFunction();

console.log("3: after calling myFunction (still sync code)");

/*
  EXPECTED OUTPUT:
    1: start
    2: inside async function, before await
    3: after calling myFunction (still sync code)
    4: inside async function, after await (microtask)

  WHY: myFunction() runs immediately until `await`, so "2" logs right
  away. At `await`, it pauses and gives control back, so "3" (sync code
  outside the function) runs next. "4" only runs after all sync code,
  as a microtask.
*/


// -----------------------------------------------------------------
// Common interview trick question
// -----------------------------------------------------------------

async function fetchData() {
  console.log("A: fetchData start");
  const result = await new Promise((resolve) => {
    setTimeout(() => resolve("data loaded"), 100);
  });
  console.log("B: got result:", result);
}

console.log("C: before calling fetchData");
fetchData();
console.log("D: after calling fetchData");

/*
  EXPECTED OUTPUT:
    C: before calling fetchData
    A: fetchData start
    D: after calling fetchData
    (... after ~100ms ...)
    B: got result: data loaded

  WHY: fetchData() runs sync until `await`, so "A" logs immediately. The
  awaited promise waits on a 100ms setTimeout (macrotask), so the
  function pauses and control returns - "D" runs before "B". "B" only
  logs once the timer fires and the promise resolves.
*/
