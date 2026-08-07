// PROGRAM 6: Async/Await Examples
// -------------------------------------
// async/await is just a cleaner way to write promise code.
// Instead of chaining .then(), we can write it like normal,
// step-by-step code using "await" to pause until a promise finishes.

function fetchUserData() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve({ id: 1, name: "Alice" });
    }, 1000);
  });
}

function fetchUserOrders(userId) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(["Order 1", "Order 2"]);
    }, 1000);
  });
}

// an "async" function always returns a promise
async function getUserWithOrders() {
  console.log("Fetching user...");
  const user = await fetchUserData(); // pauses here until the promise resolves
  console.log("Got user:", user);

  console.log("Fetching orders...");
  const orders = await fetchUserOrders(user.id);
  console.log("Got orders:", orders);

  return { user, orders };
}

// ---------------- Example usage ----------------
async function main() {
  try {
    const data = await getUserWithOrders();
    console.log("Final combined data:", data);
  } catch (error) {
    // try/catch is how we handle errors with async/await
    console.log("Something went wrong:", error);
  }
}

main();

module.exports = { fetchUserData, fetchUserOrders, getUserWithOrders };
