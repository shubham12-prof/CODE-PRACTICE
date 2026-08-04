![Memory](https://img.shields.io/badge/Section%2009-Memory%20%26%20Performance-8e44ad?style=for-the-badge&logo=javascript&logoColor=white)

# 🔴 9. Memory & Performance

---

## 5️⃣7️⃣ Garbage collection

JavaScript automatically frees memory that's no longer reachable, using algorithms like **mark-and-sweep**:

1. GC starts from "roots" (global object, currently executing functions).
2. Marks everything reachable from roots.
3. Sweeps (frees) everything NOT marked.

💡 You don't manually free memory in JS (unlike C/C++) — but you can still cause leaks by keeping unwanted references alive.

---

## 5️⃣8️⃣ Memory leaks — causes & prevention

**Common causes:**

- 🌍 Accidental global variables
- ⏱️ Forgotten timers/intervals (`setInterval` never cleared)
- 🎧 Event listeners not removed
- 🔗 Closures holding references to large unused objects
- 🗄️ Detached DOM nodes still referenced in JS

```js
// ⚠️ Leak
element.addEventListener("click", handler);
// never removed → element can't be garbage collected even after removal from DOM

// ✅ Fix
element.removeEventListener("click", handler);
```

---

## 5️⃣9️⃣ Debounce vs throttle

Both **limit how often a function runs**, but differently:

- **Debounce**: waits until the user _stops_ triggering the event for X ms, then runs once. (e.g., search-as-you-type)
- **Throttle**: runs the function at most once every X ms, no matter how often the event fires. (e.g., scroll/resize handlers)

```js
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

function throttle(fn, limit) {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
```

---

## 6️⃣0️⃣ Memoization

Caching the results of expensive function calls to avoid recomputation.

```js
function memoize(fn) {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

const slowSquare = (n) => {
  for (let i = 0; i < 1e8; i++) {}
  return n * n;
};
const fastSquare = memoize(slowSquare);
fastSquare(5); // slow first time
fastSquare(5); // instant — cached ✅
```

---

⬅️ [ES6+ Features](./08-es6-features.md) | 🏠 [Index](./README.md) | ➡️ [Next: DOM & Browser](./10-dom-browser.md)
