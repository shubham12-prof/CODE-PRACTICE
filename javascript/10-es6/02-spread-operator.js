/*
  10.2 ES6+ - Spread Operator (...)

  CORE IDEA: "spreads" (expands) the elements of an array, or the
  properties of an object, out into individual items. Used when
  COMBINING or COPYING things.
*/

// -----------------------------------------------------------------
// Spreading arrays
// -----------------------------------------------------------------
const nums1 = [1, 2, 3];
const nums2 = [4, 5, 6];

// Combine two arrays into one.
const combined = [...nums1, ...nums2];
console.log(combined); // [1, 2, 3, 4, 5, 6]

// Copy an array (a NEW array, not just a reference to the same one).
const copy = [...nums1];
copy.push(99);
console.log(nums1); // [1, 2, 3]      -> original is unaffected
console.log(copy);  // [1, 2, 3, 99]  -> only the copy changed

// Pass array items as individual function arguments.
function sum3(x, y, z) {
  return x + y + z;
}
console.log(sum3(...nums1)); // same as sum3(1, 2, 3) -> 6


// -----------------------------------------------------------------
// Spreading objects
// -----------------------------------------------------------------
const baseUser = { name: "Amit", age: 28 };

// Copy an object and override/add specific keys.
const updatedUser = { ...baseUser, age: 29, city: "Pune" };
console.log(updatedUser); // { name: 'Amit', age: 29, city: 'Pune' }
console.log(baseUser);    // { name: 'Amit', age: 28 }  -> original unchanged

// Merge two objects (later object's keys win if there's a clash).
const defaults = { theme: "light", fontSize: 14 };
const userPrefs = { fontSize: 18 };
const finalSettings = { ...defaults, ...userPrefs };
console.log(finalSettings); // { theme: 'light', fontSize: 18 }

/*
  WHY THIS MATTERS (common interview point):
  Using spread to copy arrays/objects avoids MUTATING the original data
  directly. This is important in frameworks like React, where you're
  expected to create NEW objects/arrays instead of changing existing
  ones in place (this is called "immutability").
*/
