![Basics](https://img.shields.io/badge/Section%2001-Basics%20%26%20Syntax-f7df1e?style=for-the-badge&logo=javascript&logoColor=black)

# 🟢 1. Basics & Syntax

---

## 1️⃣ What are the different data types in JavaScript?

JavaScript has **8 data types**:

**Primitive (7):**

- `String` 🔤
- `Number` 🔢
- `BigInt`
- `Boolean` ✅❌
- `undefined`
- `null`
- `Symbol`

**Non-primitive (1):**

- `Object` (includes arrays, functions, dates, etc.) 📦

```js
typeof "hello"; // "string"
typeof 42; // "number"
typeof true; // "boolean"
typeof undefined; // "undefined"
typeof null; // "object" ⚠️ (famous JS bug!)
typeof Symbol(); // "symbol"
typeof {}; // "object"
typeof function () {}; // "function"
```

> ⚠️ **Gotcha:** `typeof null === "object"` — this is a decades-old bug kept for backward compatibility.

---

## 2️⃣ Difference between `var`, `let`, and `const`

| Feature    | `var`                                | `let`              | `const`            |
| ---------- | ------------------------------------ | ------------------ | ------------------ |
| Scope      | Function-scoped                      | Block-scoped       | Block-scoped       |
| Hoisting   | Hoisted & initialized as `undefined` | Hoisted but in TDZ | Hoisted but in TDZ |
| Re-declare | ✅ Allowed                           | ❌ Not allowed     | ❌ Not allowed     |
| Re-assign  | ✅ Allowed                           | ✅ Allowed         | ❌ Not allowed     |

```js
if (true) {
  var x = 1; // leaks outside block
  let y = 2; // stays inside block
}
console.log(x); // 1
console.log(y); // ❌ ReferenceError
```

💡 **Best practice:** Use `const` by default, `let` when reassignment is needed, avoid `var`.

---

## 3️⃣ `==` vs `===`

- `==` → **loose equality**, does type coercion before comparing.
- `===` → **strict equality**, compares value AND type, no coercion.

```js
0 == "0"; // true  (coerced)
0 === "0"; // false (different types)
null == undefined; // true
null === undefined; // false
```

💡 Always prefer `===` unless you specifically want coercion.

---

## 4️⃣ Truthy & Falsy values

**Falsy values (only 8):**

```
false, 0, -0, 0n, "", null, undefined, NaN
```

Everything else is **truthy** — including `"0"`, `"false"`, `[]`, and `{}`! ⚠️

```js
if ([]) console.log("truthy!"); // runs! empty array is truthy
if ({}) console.log("truthy!"); // runs! empty object is truthy
```

---

## 5️⃣ What is `NaN` and how to check it?

`NaN` means "Not a Number" — result of invalid math operations.

```js
typeof NaN; // "number" (yes, really)
NaN === NaN; // false ⚠️ NaN is never equal to itself
isNaN("hello"); // true (coerces first)
Number.isNaN("hello"); // false (no coercion, safer ✅)
Number.isNaN(NaN); // true
```

💡 Always prefer `Number.isNaN()` over global `isNaN()`.

---

## 6️⃣ `null` vs `undefined`

|         | `null`                       | `undefined`                     |
| ------- | ---------------------------- | ------------------------------- |
| Meaning | Intentional absence of value | Variable declared, not assigned |
| Set by  | Developer                    | JavaScript engine (default)     |
| Type    | `"object"`                   | `"undefined"`                   |

```js
let a; // undefined
let b = null; // null (explicitly empty)
```

---

## 7️⃣ Type coercion

JS automatically converts types in certain operations.

```js
"5" + 3      // "53"  (number → string)
"5" - 3      // 2     (string → number)
true + 1     // 2     (boolean → number)
[] + []      // ""    (both → string)
[] + {}      // "[object Object]"
```

🧠 **Interview follow-up:** _"Why does `[] + []` give an empty string?"_ — Both arrays are converted to strings (`""` each) via `toString()`, then concatenated.

---

## 8️⃣ Template literals

Backtick strings supporting interpolation and multi-line text.

```js
const name = "Alex";
const greeting = `Hello, ${name}!
Welcome aboard 🚀`;
```

💡 Also support **tagged templates** for custom string processing:

```js
function tag(strings, ...values) {
  console.log(strings, values);
}
tag`Hi ${name}, you are ${25} years old`;
```

---

⬅️ [Back to Index](./README.md) | ➡️ [Next: Functions](./02-functions.md)
