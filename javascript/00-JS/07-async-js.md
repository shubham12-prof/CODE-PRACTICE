![Async](https://img.shields.io/badge/Section%2007-Async%20JS%20%26%20Event%20Loop-e74c3c?style=for-the-badge&logo=javascript&logoColor=white)
![MostAsked](https://img.shields.io/badge/⭐-Most%20Asked%20Topic-gold?style=for-the-badge)

# 🔴 7. Asynchronous JavaScript

> 💡 This is one of the **most frequently asked** topics in JS interviews. Master it well.

---

## 4️⃣2️⃣ The Event Loop

JavaScript is **single-threaded** but handles async operations via the event loop.

**Components:**

- 📚 **Call Stack** — where synchronous code executes
- 🌐 **Web APIs** — browser-provided async operations (`setTimeout`, DOM events, fetch)
- 🎯 **Microtask Queue** — Promises, `queueMicrotask` (HIGH priority)
- 📋 **Macrotask (Task) Queue** — `setTimeout`, `setInterval`, I/O (LOWER priority)

**Rule:** The event loop checks: is the call stack empty? → run **all microtasks** first → then run **one macrotask** → repeat.

```js
console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");

// Output: 1, 4, 3, 2
// sync code first → microtasks (Promise) → macrotasks (setTimeout)
```

---

## 4️⃣3️⃣ Synchronous vs asynchronous code

- **Sync**: executes line by line, blocking further execution until done.
- **Async**: allows other code to run while waiting (e.g., for a network response), without blocking the main thread.

---

## 4️⃣4️⃣ Callbacks & "callback hell"

```js
getUser(id, (user) => {
  getPosts(user.id, (posts) => {
    getComments(posts[0].id, (comments) => {
      console.log(comments); // deeply nested = "callback hell" / "pyramid of doom"
    });
  });
});
```

⚠️ Hard to read, debug, and handle errors consistently → solved by **Promises** and `async/await`.

---

## 4️⃣5️⃣ Promises

A `Promise` represents a value that may be available now, later, or never.

```js
const promise = new Promise((resolve, reject) => {
  const success = true;
  if (success) resolve("Done!");
  else reject("Error!");
});

promise
  .then((result) => console.log(result)) // handles success
  .catch((err) => console.error(err)) // handles failure
  .finally(() => console.log("Cleanup")); // always runs
```

---

## 4️⃣6️⃣ States of a Promise

1. 🟡 **Pending** — initial state, neither fulfilled nor rejected
2. 🟢 **Fulfilled** — operation completed successfully
3. 🔴 **Rejected** — operation failed

> Once settled (fulfilled/rejected), a Promise's state is **immutable**.

---

## 4️⃣7️⃣ `async/await`

Syntactic sugar over Promises — makes async code look synchronous.

```js
async function getUserData() {
  const response = await fetch("/api/user");
  const data = await response.json();
  return data;
}
```

- `async` functions **always return a Promise**.
- `await` pauses execution until the Promise settles, without blocking the main thread.

---

## 4️⃣8️⃣ `Promise.all` vs `race` vs `allSettled` vs `any`

```js
const p1 = Promise.resolve(1);
const p2 = new Promise((res) => setTimeout(() => res(2), 100));
const p3 = Promise.reject("err");
```

| Method                           | Behavior                                                            |
| -------------------------------- | ------------------------------------------------------------------- |
| `Promise.all([p1,p2])`           | Resolves when **all** succeed; rejects immediately if **any** fails |
| `Promise.race([p1,p2])`          | Settles as soon as the **first** promise settles (success or fail)  |
| `Promise.allSettled([p1,p2,p3])` | Waits for **all** to settle, returns status of each (never rejects) |
| `Promise.any([p1,p2,p3])`        | Resolves as soon as **any** succeeds; rejects only if **all** fail  |

---

## 4️⃣9️⃣ Error handling in async/await

```js
async function fetchData() {
  try {
    const res = await fetch("/api/data");
    if (!res.ok) throw new Error("Request failed");
    return await res.json();
  } catch (err) {
    console.error("Caught:", err.message);
  } finally {
    console.log("Always runs");
  }
}
```

---

## 5️⃣0️⃣ Microtasks vs macrotasks

|          | Microtasks                                           | Macrotasks                                     |
| -------- | ---------------------------------------------------- | ---------------------------------------------- |
| Examples | `Promise.then`, `queueMicrotask`, `MutationObserver` | `setTimeout`, `setInterval`, I/O, UI rendering |
| Priority | ✅ Higher — ALL microtasks run before next macrotask | Lower                                          |

```js
setTimeout(() => console.log("macrotask"), 0);
Promise.resolve().then(() => console.log("microtask"));
// Output: microtask, macrotask
```

---

⬅️ [Arrays & Iteration](./06-arrays-iteration.md) | 🏠 [Index](./README.md) | ➡️ [Next: ES6+ Features](./08-es6-features.md)
