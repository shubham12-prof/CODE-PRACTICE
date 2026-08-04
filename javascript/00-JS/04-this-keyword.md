![This](https://img.shields.io/badge/Section%2004-this%20Keyword-e67e22?style=for-the-badge&logo=javascript&logoColor=white)

# 🟡 4. `this` Keyword

---

## 2️⃣3️⃣ `this` in regular vs arrow functions

- **Regular function** → `this` depends on **how the function is called** (dynamic binding).
- **Arrow function** → `this` is inherited from the **enclosing lexical scope** (fixed at creation time).

```js
const obj = {
  name: "Bot",
  regular() {
    console.log(this.name);
  }, // "Bot" — called as obj.regular()
  arrow: () => {
    console.log(this.name);
  }, // undefined — inherits outer `this`
};
obj.regular(); // "Bot"
obj.arrow(); // undefined
```

---

## 2️⃣4️⃣ How `this` changes based on invocation

| Call pattern                     | `this` value                              |
| -------------------------------- | ----------------------------------------- |
| `obj.method()`                   | `obj`                                     |
| `fn()` (plain call)              | `undefined` (strict mode) / global object |
| `new Fn()`                       | the newly created object                  |
| `fn.call(ctx)` / `fn.apply(ctx)` | `ctx`                                     |
| Arrow function                   | inherited from enclosing scope            |
| Event handler (`btn.onclick`)    | the DOM element                           |

```js
function show() {
  console.log(this);
}
show(); // undefined (strict) / window (non-strict)

const o = { show };
o.show(); // o

const bound = show.bind({ a: 1 });
bound(); // { a: 1 }
```

---

## 2️⃣5️⃣ `call`, `apply`, `bind`

All three let you explicitly set `this`.

```js
function greet(greeting) {
  console.log(`${greeting}, ${this.name}`);
}
const person = { name: "Maya" };

greet.call(person, "Hi"); // arguments passed individually — "Hi, Maya"
greet.apply(person, ["Hello"]); // arguments passed as an array — "Hello, Maya"

const boundGreet = greet.bind(person); // returns a NEW function, doesn't call immediately
boundGreet("Hey"); // "Hey, Maya"
```

| Method  | Invokes immediately?   | Args format     |
| ------- | ---------------------- | --------------- |
| `call`  | ✅ Yes                 | comma-separated |
| `apply` | ✅ Yes                 | array           |
| `bind`  | ❌ No (returns new fn) | comma-separated |

---

## 2️⃣6️⃣ Implicit vs explicit binding

- **Implicit binding**: `this` is set automatically based on the object before the dot: `obj.method()`.
- **Explicit binding**: You manually set `this` using `call`, `apply`, or `bind`.

```js
const user = {
  name: "Dev",
  sayName() {
    console.log(this.name);
  },
};

user.sayName(); // implicit — "Dev"

const detached = user.sayName;
detached(); // ❌ undefined — lost implicit binding!
detached.call(user); // explicit — "Dev" ✅
```

⚠️ **Common bug:** passing `obj.method` as a callback (e.g., to `setTimeout`) loses its `this` binding. Fix with `.bind()` or an arrow function wrapper.

---

⬅️ [Scope & Closures](./03-scope-closures.md) | 🏠 [Index](./README.md) | ➡️ [Next: Objects & Prototypes](./05-objects-prototypes.md)
