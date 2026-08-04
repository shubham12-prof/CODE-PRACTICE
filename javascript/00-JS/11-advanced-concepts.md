![Advanced](https://img.shields.io/badge/Section%2011-Advanced%20Concepts-c0392b?style=for-the-badge&logo=javascript&logoColor=white)

# 🔴 11. Advanced / Tricky Concepts

---

## 6️⃣6️⃣ Currying

Transforming a function that takes multiple arguments into a sequence of functions each taking one argument.

```js
const add = (a) => (b) => (c) => a + b + c;
add(1)(2)(3); // 6

// Generic curry helper
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) return fn(...args);
    return (...more) => curried(...args, ...more);
  };
}
```

💡 Useful for creating reusable, partially-applied functions.

---

## 6️⃣7️⃣ Function composition

Combining multiple functions so the output of one becomes the input of the next.

```js
const compose =
  (...fns) =>
  (x) =>
    fns.reduceRight((acc, fn) => fn(acc), x);

const double = (n) => n * 2;
const addOne = (n) => n + 1;

const transform = compose(addOne, double); // addOne(double(x))
transform(5); // 11
```

---

## 6️⃣8️⃣ Module pattern

Uses closures (often via IIFEs) to create private state and expose a public API.

```js
const CounterModule = (function () {
  let count = 0; // private
  return {
    increment: () => ++count,
    reset: () => (count = 0),
    getCount: () => count,
  };
})();

CounterModule.increment();
CounterModule.getCount(); // 1
console.log(CounterModule.count); // undefined — truly private ✅
```

---

## 6️⃣9️⃣ Deep equality vs reference equality

```js
const a = { x: 1 };
const b = { x: 1 };
const c = a;

a === b; // false — different references (reference equality)
a === c; // true  — same reference

// Deep equality needs manual comparison or a library:
JSON.stringify(a) === JSON.stringify(b); // true (naive deep check, has caveats)
```

---

## 7️⃣0️⃣ Pure functions

A function is **pure** if:

1. Given the same input, it **always returns the same output**.
2. It has **no side effects** (doesn't modify external state, doesn't mutate arguments).

```js
// Pure ✅
const add = (a, b) => a + b;

// Impure ❌ (depends on/modifies external state)
let total = 0;
const addToTotal = (n) => (total += n);
```

💡 Pure functions are easier to test, debug, and reason about — core to functional programming.

---

## 7️⃣1️⃣ `WeakMap` and `WeakSet`

Like `Map`/`Set`, but keys **must be objects** and are **weakly referenced** — meaning they don't prevent garbage collection.

```js
let obj = { id: 1 };
const wm = new WeakMap();
wm.set(obj, "metadata");

obj = null; // the object can now be garbage collected,
// and its entry is automatically removed from the WeakMap
```

✅ **Use case:** Storing private data or metadata tied to an object's lifecycle without causing memory leaks. Not iterable, no `.size`.

---

## 7️⃣2️⃣ `JSON.stringify` / `JSON.parse` — limitations

```js
JSON.stringify({ a: undefined, b: function () {}, c: Symbol() });
// '{}' — undefined, functions, and symbols are SKIPPED

JSON.stringify({ date: new Date() });
// Date becomes a STRING, not restored as a Date on parse

JSON.stringify({ a: NaN, b: Infinity });
// '{"a":null,"b":null}' — NaN/Infinity become null

const circular = {};
circular.self = circular;
JSON.stringify(circular); // ❌ TypeError: Converting circular structure to JSON
```

💡 For complex cloning needs (Dates, Maps, circular refs), use `structuredClone()` instead.

---

⬅️ [DOM & Browser](./10-dom-browser.md) | 🏠 [Index](./README.md) | ➡️ [Next: Coding Problems](./12-coding-problems.md)
