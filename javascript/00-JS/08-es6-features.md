![ES6](https://img.shields.io/badge/Section%2008-ES6%2B%20Features-1abc9c?style=for-the-badge&logo=javascript&logoColor=white)

# 🟡 8. ES6+ Features

---

## 5️⃣1️⃣ Destructuring (array & object)

```js
// Array
const [a, b] = [1, 2];

// Object
const { name, age } = { name: "Ray", age: 30 };

// With renaming & defaults
const { name: userName, country = "Unknown" } = { name: "Ray" };
```

---

## 5️⃣2️⃣ Spread vs rest operator

Both use `...`, but do opposite things depending on context:

```js
// Spread — expands elements
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4]; // [1,2,3,4]
const obj2 = { ...{ a: 1 }, b: 2 }; // {a:1, b:2}

// Rest — collects elements into an array
function sum(...nums) {
  return nums.reduce((a, b) => a + b);
}
const [first, ...others] = [1, 2, 3]; // others = [2,3]
```

---

## 5️⃣3️⃣ `Map` & `Set`

```js
// Map — key-value pairs, keys can be ANY type
const map = new Map();
map.set("a", 1).set({}, 2);
map.get("a"); // 1
map.size; // 2

// Set — collection of UNIQUE values
const set = new Set([1, 2, 2, 3]);
set.size; // 3
```

|           | Object                                  | Map                        |
| --------- | --------------------------------------- | -------------------------- |
| Key types | strings/symbols only                    | any type                   |
| Order     | not guaranteed (mostly is, in practice) | insertion order guaranteed |
| Size      | `Object.keys(obj).length`               | `.size` property           |
| Iterable  | needs conversion                        | directly iterable          |

---

## 5️⃣4️⃣ Optional chaining `?.` and nullish coalescing `??`

```js
const user = { address: { city: "Delhi" } };

user.address?.city; // "Delhi"
user.contact?.phone; // undefined (no error, even though `contact` doesn't exist)
user.getInfo?.(); // calls only if getInfo exists

const value = null ?? "default"; // "default"
const value2 = 0 ?? "default"; // 0 (unlike ||, ?? only falls back on null/undefined)
```

⚠️ **Gotcha:** `0 || "default"` → `"default"` (0 is falsy), but `0 ?? "default"` → `0`.

---

## 5️⃣5️⃣ Modules (`import`/`export`)

```js
// math.js
export const add = (a, b) => a + b;
export default function multiply(a, b) {
  return a * b;
}

// main.js
import multiply, { add } from "./math.js";
```

- 📦 Modules have their own scope (no global pollution)
- 🔒 Automatically run in strict mode
- ⚡ Statically analyzable (enables tree-shaking)

---

## 5️⃣6️⃣ Symbol

A `Symbol` is a **unique and immutable** primitive, often used as object keys to avoid naming collisions.

```js
const id = Symbol("id");
const user = { [id]: 123, name: "Neo" };

Symbol("a") === Symbol("a"); // false — always unique!
```

💡 Used internally by JS for things like `Symbol.iterator` to make objects iterable.

---

⬅️ [Async JS](./07-async-js.md) | 🏠 [Index](./README.md) | ➡️ [Next: Memory & Performance](./09-memory-performance.md)
