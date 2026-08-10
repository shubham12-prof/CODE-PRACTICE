/*
  15. Real Interview Questions
  Promise Pool with Concurrency Limit

  PROBLEM: given a list of tasks (functions that return Promises), run
  them CONCURRENTLY, but only allow a LIMITED number to run AT THE SAME
  TIME (e.g. max 3 at once), instead of firing all of them immediately
  (which could overwhelm a server with too many parallel requests).

  CORE IDEA: keep track of how many tasks are CURRENTLY running. Start
  new tasks up to the limit. Whenever ANY task finishes, immediately
  start the NEXT one waiting in line - this keeps exactly "limit" tasks
  running at all times until the whole list is done.
*/

async function promisePool(tasks, limit) {
  const results = [];
  let currentIndex = 0; // tracks which task to start next

  // This function represents ONE "worker slot" - it keeps pulling the
  // next available task and running it, until there are none left.
  async function worker() {
    while (currentIndex < tasks.length) {
      // Claim the next task index BEFORE awaiting anything, so two
      // workers never accidentally grab the same task.
      const taskIndex = currentIndex;
      currentIndex++;

      try {
        const result = await tasks[taskIndex](); // run the task (a function returning a Promise)
        results[taskIndex] = result; // store at the correct position
      } catch (error) {
        results[taskIndex] = { error }; // capture failures instead of crashing everything
      }
    }
  }

  // Create "limit" number of workers, all running concurrently. Each
  // one keeps grabbing tasks from the shared pool until none are left.
  const workers = [];
  for (let i = 0; i < limit; i++) {
    workers.push(worker());
  }

  // Wait for ALL workers to finish pulling and completing tasks.
  await Promise.all(workers);

  return results;
}

// -----------------------------------------------------------------
// Example usage
// -----------------------------------------------------------------
function makeTask(id, delay) {
  return () =>
    new Promise((resolve) => {
      console.log(`Task ${id} started`);
      setTimeout(() => {
        console.log(`Task ${id} finished`);
        resolve(`Result ${id}`);
      }, delay);
    });
}

const tasks = [
  makeTask(1, 1000),
  makeTask(2, 500),
  makeTask(3, 800),
  makeTask(4, 300),
  makeTask(5, 600),
];

promisePool(tasks, 2).then((results) => {
  console.log("All results:", results);
});
// With limit=2, only 2 tasks run at a time - task 3 doesn't start
// until either task 1 or task 2 finishes, and so on.

/*
  WHY THIS MATTERS: firing 1000 API requests all at once with
  Promise.all() could crash a server or hit rate limits. A promise
  pool caps how many run simultaneously, which is much friendlier for
  real-world APIs, file uploads, or any batch processing job.

  TIME COMPLEXITY: total time is roughly (number of tasks / limit) *
  average task time, since only "limit" tasks ever run in parallel.
*/
