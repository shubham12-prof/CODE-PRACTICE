![Coding](https://img.shields.io/badge/Section%2012-Coding%20Problems-d35400?style=for-the-badge&logo=javascript&logoColor=white)
![MustPractice](https://img.shields.io/badge/⭐-Must%20Practice-gold?style=for-the-badge)

# 🔴 12. Coding Problems (with Solutions)

> 💡 Don't just read — **type these out yourself** and try before checking the solution.

---

## 7️⃣3️⃣ Reverse a string (no `.reverse()`)

```js
function reverseString(str) {
  let result = "";
  for (let i = str.length - 1; i >= 0; i--) {
    result += str[i];
  }
  return result;
}
reverseString("hello"); // "olleh"
```

---

## 7️⃣4️⃣ Check if a string is a palindrome

```js
function isPalindrome(str) {
  const clean = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  return clean === clean.split("").reverse().join("");
}
isPalindrome("A man a plan a canal Panama"); // true
```

---

## 7️⃣5️⃣ Flatten a nested array

```js
function flatten(arr) {
  return arr.reduce(
    (flat, item) => flat.concat(Array.isArray(item) ? flatten(item) : item),
    [],
  );
}
flatten([1, [2, [3, [4, 5]], 6]]); // [1,2,3,4,5,6]

// Or the built-in way:
[1, [2, [3, [4, 5]]]].flat(Infinity); // [1,2,3,4,5]
```

---

## 7️⃣6️⃣ Implement `debounce` and `throttle`

```js
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

function throttle(fn, limit) {
  let waiting = false;
  return function (...args) {
    if (!waiting) {
      fn.apply(this, args);
      waiting = true;
      setTimeout(() => (waiting = false), limit);
    }
  };
}
```

---

## 7️⃣7️⃣ Implement your own `map` / `reduce`

```js
Array.prototype.myMap = function (callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }
  return result;
};

Array.prototype.myReduce = function (callback, initialValue) {
  let acc = initialValue;
  let startIndex = 0;
  if (acc === undefined) {
    acc = this[0];
    startIndex = 1;
  }
  for (let i = startIndex; i < this.length; i++) {
    acc = callback(acc, this[i], i, this);
  }
  return acc;
};

[1, 2, 3].myMap((x) => x * 2); // [2,4,6]
[1, 2, 3].myReduce((a, b) => a + b, 0); // 6
```

---

## 7️⃣8️⃣ First non-repeating character in a string

```js
function firstNonRepeatingChar(str) {
  const counts = {};
  for (const char of str) {
    counts[char] = (counts[char] || 0) + 1;
  }
  for (const char of str) {
    if (counts[char] === 1) return char;
  }
  return null;
}
firstNonRepeatingChar("swiss"); // "w"
```

---

## 7️⃣9️⃣ Deep clone without `JSON.parse(JSON.stringify())`

```js
function deepClone(obj, seen = new WeakMap()) {
  if (obj === null || typeof obj !== "object") return obj;
  if (seen.has(obj)) return seen.get(obj); // handle circular references

  const clone = Array.isArray(obj) ? [] : {};
  seen.set(obj, clone);

  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      clone[key] = deepClone(obj[key], seen);
    }
  }
  return clone;
}

const original = { a: 1, nested: { b: 2 } };
const copy = deepClone(original);
copy.nested.b = 99;
console.log(original.nested.b); // 2 — unaffected ✅
```

---

## 8️⃣0️⃣ Simple event emitter (pub/sub pattern)

```js
class EventEmitter {
  constructor() {
    this.events = {};
  }
  on(event, listener) {
    (this.events[event] ??= []).push(listener);
    return this; // allow chaining
  }
  off(event, listener) {
    this.events[event] = (this.events[event] || []).filter(
      (l) => l !== listener,
    );
  }
  emit(event, ...args) {
    (this.events[event] || []).forEach((listener) => listener(...args));
  }
}

const emitter = new EventEmitter();
emitter.on("greet", (name) => console.log(`Hello, ${name}!`));
emitter.emit("greet", "World"); // "Hello, World!"
```

---

## 8️⃣1️⃣ Balanced parentheses

```js
function isBalanced(str) {
  const stack = [];
  const pairs = { ")": "(", "]": "[", "}": "{" };

  for (const char of str) {
    if (["(", "[", "{"].includes(char)) {
      stack.push(char);
    } else if (char in pairs) {
      if (stack.pop() !== pairs[char]) return false;
    }
  }
  return stack.length === 0;
}
isBalanced("{[()]}"); // true
isBalanced("{[(])}"); // false
```

---

## 8️⃣2️⃣ Implement `Promise.all` from scratch

```js
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;

    if (promises.length === 0) return resolve([]);

    promises.forEach((p, index) => {
      Promise.resolve(p)
        .then((value) => {
          results[index] = value; // preserve order
          completed++;
          if (completed === promises.length) resolve(results);
        })
        .catch(reject); // reject immediately on first failure
    });
  });
}

promiseAll([
  Promise.resolve(1),
  new Promise((res) => setTimeout(() => res(2), 100)),
  3,
]).then(console.log); // [1, 2, 3]
```

---

## 🎯 Final Tips Before Your Interview

- ✅ Re-read the [README](./README.md) study plan
- ✅ Practice explaining answers **out loud** in under 2 minutes each
- ✅ Code the solutions in #12 from memory, not by copy-pasting
- ✅ Review the ⚠️ gotchas scattered throughout — interviewers love these
- ✅ Prepare 2-3 questions to ask YOUR interviewer too

---

⬅️ [Advanced Concepts](./11-advanced-concepts.md) | 🏠 [Back to Index](./README.md)

### 🎉 You've completed the full JavaScript Interview Prep Kit! Good luck! 🍀
