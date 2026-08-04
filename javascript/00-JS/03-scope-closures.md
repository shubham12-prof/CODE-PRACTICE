![Scope](https://img.shields.io/badge/Section%2003-Scope%20%26%20Closures-9b59b6?style=for-the-badge&logo=javascript&logoColor=white)

# 🟡 3. Scope & Closures

---

## 1️⃣7️⃣ What is scope?

Scope determines **where variables are accessible**.

- 🌍 **Global scope** — accessible everywhere
- 🏠 **Function scope** — accessible only inside the function (`var`)
- 🧱 **Block scope** — accessible only inside `{ }` (`let`/`const`)

```js
{
  let blockVar = "I'm block scoped";
}
console.log(blockVar); // ❌ ReferenceError
```

---

## 1️⃣8️⃣ Hoisting

JS moves declarations to the top of their scope before execution.

```js
console.log(a); // undefined (not an error!)
var a = 5;

console.log(b); // ❌ ReferenceError (TDZ)
let b = 10;
```

|                        | Hoisted?        | Initial value       |
| ---------------------- | --------------- | ------------------- |
| `var`                  | ✅              | `undefined`         |
| `let`/`const`          | ✅ (but in TDZ) | uninitialized       |
| `function` declaration | ✅ fully        | the function itself |

---

## 1️⃣9️⃣ Temporal Dead Zone (TDZ)

The period between entering a scope and the actual declaration of a `let`/`const` variable, during which accessing it throws an error.

```js
{
  console.log(x); // ❌ ReferenceError: Cannot access 'x' before initialization
  let x = 5;
}
```

💡 TDZ exists to catch bugs early — using a variable before it's meant to be used.

---

## 2️⃣0️⃣ What is a closure?

A closure is a function that **remembers variables from its outer (lexical) scope**, even after the outer function has finished executing.

```js
function counter() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}
const increment = counter();
increment(); // 1
increment(); // 2 — `count` is "remembered" between calls
```

---

## 2️⃣1️⃣ Common use cases of closures

- 🔐 **Data privacy** (simulate private variables)

```js
function bankAccount(balance) {
  return {
    deposit: (amt) => (balance += amt),
    getBalance: () => balance,
  };
}
```

- 🧠 **Memoization** (caching expensive computation results)
- 🔁 **Function factories** (like the `multiplier` example earlier)
- 🎯 **Event handlers / callbacks** that need to retain state

---

## 2️⃣2️⃣ Lexical scoping

A variable's scope is determined by **where it is written in the code**, not where/how it's called.

```js
function outer() {
  const name = "outer-scope";
  function inner() {
    console.log(name); // can access `name` because of lexical scoping
  }
  inner();
}
```

> ⚠️ **Classic interview trap — `var` in loops:**

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 3, 3, 3 😱
}
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log(j), 100); // 0, 1, 2 ✅
}
```

🧠 **Why?** `var` is function-scoped — all callbacks share the same `i`. `let` creates a new binding per iteration.

---

⬅️ [Functions](./02-functions.md) | 🏠 [Index](./README.md) | ➡️ [Next: `this` Keyword](./04-this-keyword.md)
