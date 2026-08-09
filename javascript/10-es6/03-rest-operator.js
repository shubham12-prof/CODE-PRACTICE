/*
  10.3 ES6+ - Rest Operator (...)

  CORE IDEA: looks IDENTICAL to spread (...) but does the OPPOSITE job -
  instead of expanding values out, it COLLECTS multiple values INTO a
  single array.

  Quick way to tell them apart:
  - Spread is used when giving/expanding values (in a function call,
    or building a new array/object).
  - Rest is used when receiving/collecting values (in a function
    parameter list, or on the left side of destructuring).
*/

// -----------------------------------------------------------------
// Rest in function parameters - collect "extra" arguments into an array
// -----------------------------------------------------------------
function sumAll(...numbers) {
  // "numbers" is a real array here, so we can use array methods on it.
  return numbers.reduce((total, n) => total + n, 0);
}

console.log(sumAll(1, 2, 3));       // 6
console.log(sumAll(1, 2, 3, 4, 5)); // 15
console.log(sumAll());              // 0

// Rest can also come AFTER some named parameters (must be LAST though).
function introduce(name, age, ...hobbies) {
  console.log(`${name}, ${age} years old.`);
  console.log("Hobbies:", hobbies);
}

introduce("Sara", 25, "reading", "chess", "cycling");
// Sara, 25 years old.
// Hobbies: [ 'reading', 'chess', 'cycling' ]


// -----------------------------------------------------------------
// Rest in array destructuring - collect "remaining" items
// -----------------------------------------------------------------
const scores = [90, 85, 70, 60, 50];

const [highest, secondHighest, ...rest] = scores;
console.log(highest);       // 90
console.log(secondHighest); // 85
console.log(rest);          // [70, 60, 50]


// -----------------------------------------------------------------
// Rest in object destructuring - collect "remaining" properties
// -----------------------------------------------------------------
const product = { id: 1, name: "Laptop", price: 55000, brand: "Dell" };

const { id, ...otherDetails } = product;
console.log(id);            // 1
console.log(otherDetails);  // { name: 'Laptop', price: 55000, brand: 'Dell' }

/*
  COMMON INTERVIEW QUESTION: "What's the difference between rest and
  spread if they use the same ... syntax?"
  ANSWER: it depends on WHERE it's used.
  - In a function call or array/object literal -> it's SPREAD (expanding).
  - In a function definition's parameters, or the left side of
    destructuring -> it's REST (collecting).
*/
