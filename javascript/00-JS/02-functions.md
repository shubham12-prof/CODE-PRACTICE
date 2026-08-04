![Functions](https://img.shields.io/badge/Section%2002-Functions-61dafb?style=for-the-badge&logo=javascript&logoColor=black)

# 🟢 2. Functions

---

## 9️⃣ Function declaration vs function expression

```js
// Declaration — hoisted fully, can be called before definition
function add(a, b) {
  return a + b;
}

// Expression — NOT hoisted (the variable is, the function isn't)
const subtract = function (a, b) {
  return a - b;
};
```

💡 Function declarations are hoisted with their body; function expressions are hoisted only as `undefined` (if `var`) or stay in TDZ (if `let`/`const`).

---

## 🔟 Arrow functions vs regular functions

|                     | Regular Function             | Arrow Function                       |
| ------------------- | ---------------------------- | ------------------------------------ |
| `this`              | Own `this` (depends on call) | Inherits `this` from enclosing scope |
| `arguments` object  | ✅ Has it                    | ❌ Doesn't have it                   |
| Used as constructor | ✅ Yes (`new`)               | ❌ No                                |
| Syntax              | Verbose                      | Concise                              |

```js
const obj = {
  name: "Bot",
  regular: function () {
    console.log(this.name);
  }, // "Bot"
  arrow: () => {
    console.log(this.name);
  }, // undefined (inherits outer `this`)
};
```

---

## 1️⃣1️⃣ What is a first-class function?

Functions in JS are treated like any other value: they can be **assigned to variables, passed as arguments, and returned from other functions**.

```js
const greet = () => "Hi!";
function callFn(fn) {
  return fn();
}
callFn(greet); // "Hi!"
```

---

## 1️⃣2️⃣ Higher-order functions

A function that **takes a function as an argument** or **returns a function**.

```js
function multiplier(factor) {
  return function (num) {
    return num * factor;
  };
}
const double = multiplier(2);
double(5); // 10
```

`map`, `filter`, `reduce` are built-in higher-order functions.

---

## 1️⃣3️⃣ Callback function

A function passed into another function to be executed later.

```js
function fetchData(callback) {
  setTimeout(() => callback("data loaded"), 1000);
}
fetchData((result) => console.log(result));
```

---

## 1️⃣4️⃣ `arguments` object vs rest parameters

```js
function old() {
  console.log(arguments); // array-like object, only in regular functions
}

function modern(...args) {
  console.log(args); // real array ✅, works everywhere including arrow fns
}
```

💡 Rest params are the modern, safer choice — they give a real array with all methods (`map`, `filter`, etc.).

---

## 1️⃣5️⃣ Default parameters

```js
function greet(name = "Guest") {
  return `Hello, ${name}`;
}
greet(); // "Hello, Guest"
greet("Sam"); // "Hello, Sam"
```

⚠️ Defaults only kick in for `undefined`, not `null` or `""`.

---

## 1️⃣6️⃣ IIFE (Immediately Invoked Function Expression)

```js
(function () {
  console.log("Runs immediately!");
})();
```

**Why use it?**

- 🔒 Creates a private scope (avoids polluting global scope)
- 📦 Was the main pattern for module encapsulation before ES Modules existed

---

⬅️ [Basics](./01-basics.md) | 🏠 [Index](./README.md) | ➡️ [Next: Scope & Closures](./03-scope-closures.md)
