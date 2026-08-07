// PROGRAM 2: Promise Chaining
// -------------------------------------
// Each .then() returns a new promise, so we can chain multiple
// .then() calls together to run steps one after another, passing
// the result from one step to the next.

function stepOne(number) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      console.log("Step 1: doubling", number);
      resolve(number * 2);
    }, 500);
  });
}

function stepTwo(number) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      console.log("Step 2: adding 10 to", number);
      resolve(number + 10);
    }, 500);
  });
}

function stepThree(number) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      console.log("Step 3: squaring", number);
      resolve(number * number);
    }, 500);
  });
}

// ---------------- Example usage ----------------
stepOne(3)
  .then(function (result) {
    return stepTwo(result); // pass result to the next step
  })
  .then(function (result) {
    return stepThree(result);
  })
  .then(function (finalResult) {
    console.log("Final result:", finalResult);
  })
  .catch(function (error) {
    console.log("Something went wrong:", error);
  });

module.exports = { stepOne, stepTwo, stepThree };
