![DOM](https://img.shields.io/badge/Section%2010-DOM%20%26%20Browser-2ecc71?style=for-the-badge&logo=javascript&logoColor=white)

# 🟡 10. DOM & Browser Concepts

---

## 6️⃣1️⃣ Event bubbling vs capturing

```
Capturing phase: window → ... → target  (top-down)
Target phase:    the element itself
Bubbling phase:  target → ... → window  (bottom-up, DEFAULT)
```

```js
child.addEventListener("click", handler); // bubbling (default)
parent.addEventListener("click", handler, true); // capturing (3rd arg = true)
```

---

## 6️⃣2️⃣ Event delegation

Instead of attaching listeners to many child elements, attach **one listener to a common parent** and use event bubbling to handle events.

```js
document.getElementById("list").addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    console.log("Clicked:", e.target.textContent);
  }
});
```

✅ **Benefits:** Better performance (fewer listeners), works automatically for dynamically added children.

---

## 6️⃣3️⃣ Stopping event propagation

```js
element.addEventListener("click", (e) => {
  e.stopPropagation(); // stops the event from bubbling further up
});
```

---

## 6️⃣4️⃣ `preventDefault()` vs `stopPropagation()`

|             | `preventDefault()`                                                          | `stopPropagation()`                                                  |
| ----------- | --------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Purpose     | Stops the browser's **default action** (e.g., form submit, link navigation) | Stops the event from **propagating** to other elements               |
| Example use | Prevent a form from submitting to validate first                            | Prevent a click on a child from also triggering the parent's handler |

```js
form.addEventListener("submit", (e) => {
  e.preventDefault(); // stops page reload
});
```

---

## 6️⃣5️⃣ `localStorage` vs `sessionStorage` vs cookies

|                 | `localStorage`        | `sessionStorage`           | Cookies                            |
| --------------- | --------------------- | -------------------------- | ---------------------------------- |
| Capacity        | ~5-10MB               | ~5-10MB                    | ~4KB                               |
| Expiry          | Never (until cleared) | Until tab closes           | Configurable (`expires`/`max-age`) |
| Sent to server? | ❌ No                 | ❌ No                      | ✅ Yes, with every HTTP request    |
| Accessible from | Same origin, all tabs | Same origin, same tab only | Same origin (+ can be `httpOnly`)  |

```js
localStorage.setItem("theme", "dark");
sessionStorage.setItem("draft", "hello");
document.cookie = "user=Alex; max-age=3600";
```

---

⬅️ [Memory & Performance](./09-memory-performance.md) | 🏠 [Index](./README.md) | ➡️ [Next: Advanced Concepts](./11-advanced-concepts.md)
