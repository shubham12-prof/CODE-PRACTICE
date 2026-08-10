/*
  16. Output-Based Questions
  Classes

  CORE IDEA: ES6 classes are mostly "syntactic sugar" over the
  prototype system - under the hood, class methods still live on the
  prototype, just written in a cleaner syntax. Key things interviewers
  test: class fields, inheritance (extends/super), static members, and
  the fact that classes are NOT hoisted the same way functions are.
*/

// -----------------------------------------------------------------
// Example 1: classes are NOT hoisted like function declarations
// -----------------------------------------------------------------
// const early = new Animal("Rex"); // ❌ ReferenceError: Cannot access
                                    // 'Animal' before initialization
                                    // (class is in the Temporal Dead Zone)

class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(`${this.name} makes a sound.`);
  }
}

const rex = new Animal("Rex");
rex.speak(); // "Rex makes a sound."


// -----------------------------------------------------------------
// Example 2: inheritance with extends/super
// -----------------------------------------------------------------
class Dog extends Animal {
  constructor(name, breed) {
    super(name); // MUST call super() before using "this" in a subclass
    this.breed = breed;
  }

  speak() {
    // Call the PARENT class's version first, then add extra behavior.
    super.speak();
    console.log(`${this.name} barks! (${this.breed})`);
  }
}

const dog = new Dog("Buddy", "Labrador");
dog.speak();
// "Buddy makes a sound."
// "Buddy barks! (Labrador)"


// -----------------------------------------------------------------
// Example 3: static methods/properties belong to the CLASS, not
// individual instances
// -----------------------------------------------------------------
class MathHelper {
  static PI = 3.14159;

  static square(n) {
    return n * n;
  }
}

console.log(MathHelper.PI);        // 3.14159
console.log(MathHelper.square(5)); // 25

const helper = new MathHelper();
// console.log(helper.square(5)); // ❌ TypeError: helper.square is not
// a function - static methods are NOT available on instances, only
// on the class itself.


// -----------------------------------------------------------------
// Example 4: class methods are NOT enumerable and live on the prototype
// -----------------------------------------------------------------
class Greeter {
  greet() {
    console.log("Hello!");
  }
}

const g = new Greeter();
console.log(Object.keys(g)); // []  -> greet() is NOT an "own" property
console.log(g.hasOwnProperty("greet")); // false
console.log(Greeter.prototype.hasOwnProperty("greet")); // true
console.log(g.greet === Greeter.prototype.greet); // true - it's shared


// -----------------------------------------------------------------
// Example 5: "this" inside regular class methods vs class field arrow
// functions (relevant when passing methods as callbacks)
// -----------------------------------------------------------------
class Button {
  label = "Click me";

  handleClickRegular() {
    console.log(this.label); // breaks if called detached from an instance
  }

  handleClickArrow = () => {
    console.log(this.label); // always bound correctly, safe as a callback
  };
}

const btn = new Button();
const detachedRegular = btn.handleClickRegular;
// detachedRegular(); // ❌ TypeError: Cannot read properties of undefined

const detachedArrow = btn.handleClickArrow;
detachedArrow(); // ✅ "Click me" - works fine even when detached
