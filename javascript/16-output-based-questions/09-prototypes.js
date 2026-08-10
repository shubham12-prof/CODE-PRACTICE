/*
  16. Output-Based Questions
  Prototypes

  CORE IDEA: every JS object has an internal link to another object
  called its PROTOTYPE. When you access a property that doesn't exist
  directly on an object, JS automatically looks UP the "prototype
  chain" to find it, before giving up and returning undefined.
*/

// -----------------------------------------------------------------
// Example 1: accessing a property not directly on the object
// -----------------------------------------------------------------
const animal = {
  eats: true,
};

const rabbit = Object.create(animal); // rabbit's prototype is "animal"
rabbit.jumps = true;

console.log(rabbit.jumps); // true  - own property
console.log(rabbit.eats);  // true  - NOT own, found via prototype chain
console.log(rabbit.hasOwnProperty("eats"));  // false - it's inherited, not "own"
console.log(rabbit.hasOwnProperty("jumps")); // true


// -----------------------------------------------------------------
// Example 2: functions and their .prototype property (constructor pattern)
// -----------------------------------------------------------------
function Person(name) {
  this.name = name;
}

// Adding a method to Person.prototype means EVERY instance created
// with "new Person()" shares this SAME function - it's not duplicated
// per instance, saving memory.
Person.prototype.greet = function () {
  console.log(`Hi, I'm ${this.name}`);
};

const p1 = new Person("Maya");
const p2 = new Person("Dev");

p1.greet(); // "Hi, I'm Maya"
p2.greet(); // "Hi, I'm Dev"

// Both instances share the EXACT SAME greet function in memory:
console.log(p1.greet === p2.greet); // true


// -----------------------------------------------------------------
// Example 3: modifying a prototype AFTER instances already exist
// still affects them (since lookup happens live, at ACCESS time)
// -----------------------------------------------------------------
function Car(model) {
  this.model = model;
}

const car1 = new Car("Tesla");

// Add a new method to the prototype AFTER car1 was already created.
Car.prototype.honk = function () {
  console.log(`${this.model} says beep!`);
};

car1.honk(); // "Tesla says beep!" - works even though honk() was
             // added to the prototype AFTER car1 existed, because
             // property lookup happens live, not at creation time.


// -----------------------------------------------------------------
// Example 4: own property SHADOWS a prototype property with the same name
// -----------------------------------------------------------------
function Shape() {}
Shape.prototype.color = "black";

const shape1 = new Shape();
console.log(shape1.color); // "black" - from the prototype

shape1.color = "red"; // sets an OWN property directly on shape1
console.log(shape1.color); // "red" - own property found FIRST, shadows
                            // the prototype's version

console.log(Shape.prototype.color); // still "black" - the prototype
                                     // itself was never changed
