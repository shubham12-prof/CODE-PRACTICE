![Objects](https://img.shields.io/badge/Section%2005-Objects%20%26%20Prototypes-16a085?style=for-the-badge&logo=javascript&logoColor=white)

# 🟡 5. Objects & Prototypes

---

## 2️⃣7️⃣ Prototypal inheritance

Every JS object has an internal link (`[[Prototype]]`) to another object it inherits properties/methods from — forming a **prototype chain**.

```js
const animal = { eats: true };
const dog = Object.create(animal);
dog.barks = true;

console.log(dog.eats); // true — inherited from `animal`
```

---

## 2️⃣8️⃣ `__proto__` vs `prototype`

|           | `__proto__`                           | `prototype`                                            |
| --------- | ------------------------------------- | ------------------------------------------------------ |
| Exists on | Every object instance                 | Only on functions (constructors)                       |
| Purpose   | Points to the object it inherits from | Defines what instances created with `new` will inherit |

```js
function Person(name) {
  this.name = name;
}
const p = new Person("Ana");

p.__proto__ === Person.prototype; // true ✅
```

---

## 2️⃣9️⃣ Ways to create objects

```js
// 1. Object literal
const a = { x: 1 };

// 2. Constructor function
function Point(x, y) {
  this.x = x;
  this.y = y;
}
const b = new Point(1, 2);

// 3. Object.create
const c = Object.create({
  greet() {
    return "hi";
  },
});

// 4. ES6 Class
class Point2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
const d = new Point2(1, 2);
```

---

## 3️⃣0️⃣ Getters and setters

```js
const user = {
  firstName: "John",
  lastName: "Doe",
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
  set fullName(value) {
    [this.firstName, this.lastName] = value.split(" ");
  },
};

console.log(user.fullName); // "John Doe"
user.fullName = "Jane Smith";
console.log(user.firstName); // "Jane"
```

---

## 3️⃣1️⃣ Shallow copy vs deep copy

- **Shallow copy** → copies only the top level; nested objects are still shared by reference.
- **Deep copy** → recursively copies everything, no shared references.

```js
const original = { a: 1, nested: { b: 2 } };

const shallow = { ...original };
shallow.nested.b = 99;
console.log(original.nested.b); // 99 😱 (shared reference!)

const deep = structuredClone(original); // true deep copy ✅
deep.nested.b = 5;
console.log(original.nested.b); // still 99
```

---

## 3️⃣2️⃣ How to clone an object

```js
const obj = { a: 1, b: { c: 2 } };

const shallow1 = { ...obj };
const shallow2 = Object.assign({}, obj);
const deep1 = structuredClone(obj); // ✅ modern, handles most cases
const deep2 = JSON.parse(JSON.stringify(obj)); // ⚠️ loses functions, undefined, Dates become strings
```

---

## 3️⃣3️⃣ ES6 classes & prototypes

Classes are **syntactic sugar** over prototypal inheritance — under the hood, methods still live on `prototype`.

```js
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return `${this.name} makes a sound`;
  }
}
typeof Animal; // "function"
Animal.prototype.speak; // the function itself
```

---

## 3️⃣4️⃣ `Object.freeze()` vs `Object.seal()`

|                        | `Object.freeze()` | `Object.seal()` |
| ---------------------- | ----------------- | --------------- |
| Add new properties     | ❌ No             | ❌ No           |
| Delete properties      | ❌ No             | ❌ No           |
| Modify existing values | ❌ No             | ✅ Yes          |

```js
const frozen = Object.freeze({ a: 1 });
frozen.a = 2; // fails silently (or throws in strict mode)
console.log(frozen.a); // 1

const sealed = Object.seal({ a: 1 });
sealed.a = 2; // ✅ allowed
console.log(sealed.a); // 2
```

---

⬅️ [`this` Keyword](./04-this-keyword.md) | 🏠 [Index](./README.md) | ➡️ [Next: Arrays & Iteration](./06-arrays-iteration.md)
