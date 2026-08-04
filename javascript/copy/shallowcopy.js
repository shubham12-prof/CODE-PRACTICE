// 1. Shallow Copy
// A shallow copy creates a new object or array, but nested objects are copied by reference.
// This means:
// 1. Top-level properties are copied.
// 2. Nested objects or arrays still share the same memory reference.
// 3. Modifying nested values in the copied object WILL affect the original object.

// Example

// Original object
const obj1 = {
    name: "Shubham",
    address: {
        city: "Delhi"
    }
};

// Shallow copy using spread operator
const obj2 = { ...obj1 };

// Modify nested object
obj2.address.city = "Mumbai";

// Output
console.log(obj1.address.city); // Mumbai
console.log(obj2.address.city); // Mumbai



// Shallow Copy Methods

// 1. Spread Operator
const shallowCopy1 = { ...obj1 };



// 2. Object.assign()
const shallowCopy2 = Object.assign({}, obj1);



// 3. Array Shallow Copy Methods
const arr1 = [1, 2, 3];

// Spread
const arrCopy1 = [...arr1];

// slice()
const arrCopy2 = arr1.slice();

// Array.from()
const arrCopy3 = Array.from(arr1);



// Example showing shallow copy problem

const user1 = {
    name: "Shubham",
    skills: {
        frontend: "React"
    }
};

const user2 = { ...user1 };

user2.skills.frontend = "Angular";

console.log(user1.skills.frontend); // Angular
console.log(user2.skills.frontend); // Angular



// Reason:
// user1.skills and user2.skills both point to the same object in memory.