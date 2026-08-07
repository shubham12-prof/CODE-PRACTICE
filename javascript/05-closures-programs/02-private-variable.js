// PROGRAM 2: Private Variable using Closure
// -------------------------------------
// JavaScript doesn't have a built-in "private" keyword for
// variables (older versions didn't, at least). Closures let us
// fake this by keeping a variable hidden inside a function, and
// only allowing access to it through specific returned functions.

function createBankAccount(initialBalance) {
  let balance = initialBalance; // private - can't be accessed directly from outside

  return {
    deposit: function (amount) {
      balance = balance + amount;
      console.log("Deposited:", amount, "New balance:", balance);
    },
    withdraw: function (amount) {
      if (amount > balance) {
        console.log("Not enough balance!");
        return;
      }
      balance = balance - amount;
      console.log("Withdrew:", amount, "New balance:", balance);
    },
    getBalance: function () {
      return balance;
    },
  };
}

// ---------------- Example usage ----------------
const account = createBankAccount(100);

account.deposit(50); // Deposited: 50 New balance: 150
account.withdraw(30); // Withdrew: 30 New balance: 120

console.log("Current balance:", account.getBalance()); // 120

// There is no direct way to do account.balance = 1000000
// because "balance" is not exposed - it's private inside the closure
console.log("Direct access attempt:", account.balance); // undefined

module.exports = { createBankAccount };
