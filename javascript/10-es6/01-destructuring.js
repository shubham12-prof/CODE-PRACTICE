/*
  10.1 ES6+ - Destructuring

  CORE IDEA: "unpack" values out of arrays or objects into separate
  variables in one line, instead of accessing them one by one.
*/

// -----------------------------------------------------------------
// Array destructuring - unpacks by POSITION (order matters)
// -----------------------------------------------------------------
const colors = ["red", "green", "blue"];

const [first, second, third] = colors;
console.log(first, second, third); // red green blue

// Skip a value using an empty slot (comma with nothing between).
const [, , thirdOnly] = colors;
console.log(thirdOnly); // blue

// Swap two variables without a temp variable - a classic use case.
let a = 1;
let b = 2;
[a, b] = [b, a];
console.log(a, b); // 2 1


// -----------------------------------------------------------------
// Object destructuring - unpacks by KEY NAME (order doesn't matter)
// -----------------------------------------------------------------
const user = { name: "Riya", age: 24, city: "Delhi" };

const { name, age } = user;
console.log(name, age); // Riya 24

// Rename while destructuring using ":"
const { name: userName } = user;
console.log(userName); // Riya

// Provide a default value if the key doesn't exist.
const { country = "India" } = user;
console.log(country); // India (not on the object, so default is used)


// -----------------------------------------------------------------
// Destructuring function parameters - very common in real code
// -----------------------------------------------------------------
function greet({ name, age }) {
  // instead of writing person.name, person.age inside the function
  console.log(`Hi ${name}, you are ${age} years old.`);
}

greet(user); // Hi Riya, you are 24 years old.


// -----------------------------------------------------------------
// Nested destructuring - unpacking objects/arrays inside objects/arrays
// -----------------------------------------------------------------
const company = {
  name: "TechCorp",
  address: { city: "Mumbai", pin: 400001 },
};

const {
  address: { city },
} = company;
console.log(city); // Mumbai
