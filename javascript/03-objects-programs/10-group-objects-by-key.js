/**
 * PROGRAM 10: Group Objects by Key
 * -------------------------------------
 * Goal: Given an array of objects, group them into buckets based on
 * the value of some property (e.g. group a list of people by "city",
 * or a list of orders by "status").
 *
 * How it works:
 * - We use .reduce() to build up a single result object as we walk
 *   through the array.
 * - For each item, we compute its "group key" (either a property
 *   name, or the result of a function you pass in — this makes it
 *   flexible for both simple and computed groupings).
 * - If that group doesn't exist yet in our accumulator, we create an
 *   empty array for it.
 * - We push the current item into its corresponding group's array.
 */

function groupBy(array, keyOrFn) {
  return array.reduce((groups, item) => {
    // Support either a property name (string) or a function that
    // computes the group key from the item, e.g. item => item.age > 18
    const groupKey =
      typeof keyOrFn === "function" ? keyOrFn(item) : item[keyOrFn];

    // Initialize the bucket for this key if it doesn't exist yet
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }

    groups[groupKey].push(item); // add this item to its group
    return groups;
  }, {});
}

// ---------------- Example usage ----------------
const people = [
  { name: "Alice", city: "Delhi" },
  { name: "Bob", city: "Mumbai" },
  { name: "Charlie", city: "Delhi" },
  { name: "Dave", city: "Chennai" },
  { name: "Eve", city: "Mumbai" },
];

console.log("Grouped by city:", groupBy(people, "city"));
/* Output:
{
  Delhi: [ { name: 'Alice', city: 'Delhi' }, { name: 'Charlie', city: 'Delhi' } ],
  Mumbai: [ { name: 'Bob', city: 'Mumbai' }, { name: 'Eve', city: 'Mumbai' } ],
  Chennai: [ { name: 'Dave', city: 'Chennai' } ]
}
*/

// Example with a function key (computed grouping)
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const grouped = groupBy(numbers.map((n) => ({ value: n })), (item) =>
  item.value % 2 === 0 ? "even" : "odd"
);
console.log("Grouped by even/odd:", grouped);

module.exports = { groupBy };
