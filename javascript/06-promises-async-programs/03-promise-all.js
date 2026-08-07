// PROGRAM 3: Promise.all
// -------------------------------------
// Promise.all waits for ALL promises to finish successfully, and
// gives back an array of all their results (in the same order).
// If even ONE promise fails, the whole thing fails immediately.

function fetchUser() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve({ id: 1, name: "Alice" });
    }, 1000);
  });
}

function fetchPosts() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(["Post 1", "Post 2"]);
    }, 1500);
  });
}

function fetchComments() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(["Comment A", "Comment B"]);
    }, 800);
  });
}

// ---------------- Example usage ----------------
console.log("Fetching all data at the same time...");

Promise.all([fetchUser(), fetchPosts(), fetchComments()])
  .then(function (results) {
    // results[0] = user, results[1] = posts, results[2] = comments
    console.log("User:", results[0]);
    console.log("Posts:", results[1]);
    console.log("Comments:", results[2]);
  })
  .catch(function (error) {
    console.log("One of the requests failed:", error);
  });

module.exports = { fetchUser, fetchPosts, fetchComments };
