![Arrays](https://img.shields.io/badge/Section%2006-Arrays%20%26%20Iteration-3498db?style=for-the-badge&logo=javascript&logoColor=white)

# 🟡 6. Arrays & Iteration

---

## 3️⃣5️⃣ `map` vs `forEach` vs `filter` vs `reduce`

```js
const nums = [1, 2, 3, 4];

nums.map((n) => n * 2); // [2,4,6,8] — returns NEW array
nums.forEach((n) => console.log(n)); // returns undefined, just iterates
nums.filter((n) => n % 2 === 0); // [2,4] — keeps items matching condition
nums.reduce((acc, n) => acc + n, 0); // 10 — reduces to a single value
```

| Method    | Returns                 | Mutates original?               |
| --------- | ----------------------- | ------------------------------- |
| `map`     | new array               | ❌                              |
| `forEach` | `undefined`             | ❌ (unless you mutate manually) |
| `filter`  | new array               | ❌                              |
| `reduce`  | single value (any type) | ❌                              |

---

## 3️⃣6️⃣ Remove duplicates from an array

```js
const arr = [1, 2, 2, 3, 3, 3];

const unique1 = [...new Set(arr)]; // ✅ easiest — [1,2,3]
const unique2 = arr.filter((v, i) => arr.indexOf(v) === i);
```

---

## 3️⃣7️⃣ `slice` vs `splice`

|                   | `slice`                       | `splice`                          |
| ----------------- | ----------------------------- | --------------------------------- |
| Mutates original? | ❌ No                         | ✅ Yes                            |
| Purpose           | Extract a copy of a portion   | Add/remove/replace items in place |
| Returns           | New array (extracted portion) | Array of removed items            |

```js
const arr = [1, 2, 3, 4, 5];

arr.slice(1, 3); // [2, 3] — original untouched
arr.splice(1, 2); // removes [2,3], arr is now [1,4,5]
arr.splice(1, 0, "x"); // inserts "x" at index 1 without removing anything
```

---

## 3️⃣8️⃣ Array destructuring

```js
const [first, second, ...rest] = [10, 20, 30, 40];
console.log(first, second, rest); // 10 20 [30, 40]

const [a, , c] = [1, 2, 3]; // skip index 1
console.log(a, c); // 1 3

// swapping values
let x = 1,
  y = 2;
[x, y] = [y, x]; // x=2, y=1
```

---

## 3️⃣9️⃣ `for` vs `for...in` vs `for...of`

```js
const arr = ["a", "b", "c"];

for (let i = 0; i < arr.length; i++) {} // classic index loop

for (const index in arr) {
} // iterates over KEYS/indices (as strings) — use for objects
for (const value of arr) {
} // iterates over VALUES — use for arrays/iterables
```

⚠️ Avoid `for...in` on arrays — it also picks up inherited enumerable properties and index order isn't guaranteed.

---

## 4️⃣0️⃣ Iterables and iterators

- **Iterable**: an object implementing `Symbol.iterator` (e.g., arrays, strings, Maps, Sets) — can be used with `for...of`.
- **Iterator**: an object with a `.next()` method returning `{ value, done }`.

```js
const arr = [1, 2, 3];
const it = arr[Symbol.iterator]();
it.next(); // { value: 1, done: false }
it.next(); // { value: 2, done: false }
```

---

## 4️⃣1️⃣ Generators

Functions that can **pause and resume** execution, producing a sequence of values lazily.

```js
function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const gen = idGenerator();
gen.next().value; // 1
gen.next().value; // 2
gen.next().value; // 3
```

💡 Useful for lazy evaluation, infinite sequences, and building custom iterables.

---

⬅️ [Objects & Prototypes](./05-objects-prototypes.md) | 🏠 [Index](./README.md) | ➡️ [Next: Async JS](./07-async-js.md)
