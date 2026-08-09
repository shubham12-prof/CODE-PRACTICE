/*
  10.4 ES6+ - Template Literals

  CORE IDEA: strings wrapped in backticks (`) instead of quotes, which
  let you:
  1. Embed variables/expressions directly using ${...}
  2. Write multi-line strings without needing \n or string concatenation
*/

// -----------------------------------------------------------------
// Embedding variables - no more "+" string concatenation
// -----------------------------------------------------------------
const name = "Vikram";
const age = 30;

// OLD WAY (string concatenation):
const oldWay = "My name is " + name + " and I am " + age + " years old.";

// NEW WAY (template literal):
const newWay = `My name is ${name} and I am ${age} years old.`;

console.log(oldWay);
console.log(newWay);
// Both print the same thing, but template literals are much easier to
// read, especially with several variables.


// -----------------------------------------------------------------
// You can put ANY expression inside ${...}, not just variables
// -----------------------------------------------------------------
const price = 500;
const quantity = 3;

console.log(`Total: ${price * quantity}`); // Total: 1500

function getGreeting() {
  return "Hello";
}
console.log(`${getGreeting()}, ${name}!`); // Hello, Vikram!


// -----------------------------------------------------------------
// Multi-line strings - just press Enter, no \n needed
// -----------------------------------------------------------------
const message = `Dear ${name},
Thank you for your order.
Your total is ${price * quantity}.`;

console.log(message);
/*
  Dear Vikram,
  Thank you for your order.
  Your total is 1500.
*/


// -----------------------------------------------------------------
// Bonus: tagged templates (less common, but good to know exists)
// A function can process a template literal before it becomes a string.
// -----------------------------------------------------------------
function upperTag(strings, ...values) {
  return strings.reduce(
    (result, str, i) => result + str + (values[i] ? values[i].toUpperCase() : ""),
    ""
  );
}

console.log(upperTag`Hello ${name}, welcome!`);
// Hello VIKRAM, welcome!
