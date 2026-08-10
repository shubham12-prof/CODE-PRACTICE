/*
  16. Output-Based Questions
  Closures

  CORE IDEA: a closure is a function that "remembers" the variables
  from the scope it was CREATED in, even after that outer scope has
  already finished running.
*/

// -----------------------------------------------------------------
// Example 1: basic closure - counter
// -----------------------------------------------------------------
function createCounter() {
  let count = 0; // this variable is "enclosed" by the returned function

  return function () {
    count++;
    return count;
  };
}

const counter1 = createCounter();
console.log(counter1()); // 1
console.log(counter1()); // 2
console.log(counter1()); // 3

// A NEW call to createCounter() makes a BRAND NEW, separate "count"
// variable - counters don't share state with each other.
const counter2 = createCounter();
console.log(counter2()); // 1  (fresh counter, unaffected by counter1)


// -----------------------------------------------------------------
// Example 2: classic loop + closure interview trap (var version)
// -----------------------------------------------------------------
function createFunctionsVar() {
  var functions = [];
  for (var i = 0; i < 3; i++) {
    functions.push(function () {
      console.log("var version:", i);
    });
  }
  return functions;
}

const varFns = createFunctionsVar();
varFns[0](); // var version: 3
varFns[1](); // var version: 3
varFns[2](); // var version: 3
// WHY: all three functions close over the SAME "i" (var is shared
// across the whole loop). By the time any of them actually RUN, the
// loop has already finished and i is 3.


// -----------------------------------------------------------------
// Example 3: same thing, but using let - fixes the trap
// -----------------------------------------------------------------
function createFunctionsLet() {
  var functions = [];
  for (let i = 0; i < 3; i++) {
    functions.push(function () {
      console.log("let version:", i);
    });
  }
  return functions;
}

const letFns = createFunctionsLet();
letFns[0](); // let version: 0
letFns[1](); // let version: 1
letFns[2](); // let version: 2
// WHY: "let" creates a NEW "i" binding for each loop iteration, so
// each pushed function closes over its OWN separate copy of i.


// -----------------------------------------------------------------
// Example 4: closures for data privacy (a real practical use case)
// -----------------------------------------------------------------
function createBankAccount(initialBalance) {
  let balance = initialBalance; // NOT accessible from outside directly

  return {
    deposit(amount) {
      balance += amount;
      return balance;
    },
    withdraw(amount) {
      if (amount > balance) {
        console.log("Insufficient funds");
        return balance;
      }
      balance -= amount;
      return balance;
    },
    getBalance() {
      return balance;
    },
  };
}

const account = createBankAccount(100);
console.log(account.deposit(50));  // 150
console.log(account.withdraw(30)); // 120
console.log(account.getBalance()); // 120
// There's no direct way to do `account.balance = 1000000` - the only
// way to change "balance" is through the methods we exposed. This is
// how closures simulate "private" variables in JS.
