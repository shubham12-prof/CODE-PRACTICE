// 2. Deep Copy
// A deep copy creates a completely independent copy of an object, including all nested objects.
// This means:
// 1. Top-level properties are copied.
// 2. Nested objects are also copied to new memory locations.
// 3. Modifying the copied object will NOT affect the original object.

// Example

// Original object
const obj1 = {
    name: "Shubham",
    address: {
        city: "Delhi"
    }
};

// Deep copy using structuredClone
const obj2 = structuredClone(obj1);

// Modify nested object
obj2.address.city = "Mumbai";

// Output
console.log(obj1.address.city); // Delhi
console.log(obj2.address.city); // Mumbai



// Deep Copy Methods

// 1. structuredClone (Recommended - Modern JavaScript)
const deepCopy1 = structuredClone(obj1);



// 2. JSON Method (Older approach)
const deepCopy2 = JSON.parse(JSON.stringify(obj1));



// ⚠️ Limitations of JSON method

// 1. Removes functions
const objFunc = {
    name: "Shubham",
    sayHello: function () {
        console.log("Hello");
    }
};

const copyFunc = JSON.parse(JSON.stringify(objFunc));
console.log(copyFunc.sayHello); // undefined



// 2. Removes undefined values
const objUndefined = {
    name: "Shubham",
    age: undefined
};

const copyUndefined = JSON.parse(JSON.stringify(objUndefined));
console.log(copyUndefined); // { name: "Shubham" }



// 3. Converts Date into string
const objDate = {
    today: new Date()
};

const copyDate = JSON.parse(JSON.stringify(objDate));
console.log(typeof copyDate.today); // string



// 4. Doesn't support Map / Set
const objMap = {
    map: new Map([["a", 1]])
};

const copyMap = JSON.parse(JSON.stringify(objMap));
console.log(copyMap); // { map: {} }