/*
  17. Mini Projects
  Shopping Cart

  ASSUMED HTML:
    <div id="productList"></div>
    <div id="cart">
      <ul id="cartItems"></ul>
      <div id="cartTotal"></div>
    </div>

  CORE IDEA: keep the cart as an array of { product, quantity } - one
  entry per UNIQUE product, with a quantity count, rather than pushing
  a duplicate entry every time the same item is added again.
*/

const productListEl = document.getElementById("productList");
const cartItemsEl = document.getElementById("cartItems");
const cartTotalEl = document.getElementById("cartTotal");

const products = [
  { id: 1, name: "Wireless Mouse", price: 799 },
  { id: 2, name: "Mechanical Keyboard", price: 2499 },
  { id: 3, name: "USB-C Hub", price: 1299 },
  { id: 4, name: "Laptop Stand", price: 999 },
];

let cart = []; // array of { productId, quantity }

function renderProducts() {
  productListEl.innerHTML = "";

  products.forEach((product) => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <span>${product.name} - ₹${product.price}</span>
    `;

    const addBtn = document.createElement("button");
    addBtn.textContent = "Add to Cart";
    addBtn.addEventListener("click", () => addToCart(product.id));

    div.appendChild(addBtn);
    productListEl.appendChild(div);
  });
}

function addToCart(productId) {
  const existingItem = cart.find((item) => item.productId === productId);

  if (existingItem) {
    // Already in the cart - just bump the quantity instead of adding
    // a duplicate row.
    existingItem.quantity++;
  } else {
    cart.push({ productId, quantity: 1 });
  }

  renderCart();
}

function updateQuantity(productId, delta) {
  const item = cart.find((i) => i.productId === productId);
  if (!item) return;

  item.quantity += delta;

  if (item.quantity <= 0) {
    // Quantity dropped to 0 or below - remove it from the cart entirely.
    cart = cart.filter((i) => i.productId !== productId);
  }

  renderCart();
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.productId !== productId);
  renderCart();
}

function calculateTotal() {
  return cart.reduce((total, item) => {
    const product = products.find((p) => p.id === item.productId);
    return total + product.price * item.quantity;
  }, 0);
}

function renderCart() {
  cartItemsEl.innerHTML = "";

  cart.forEach((item) => {
    const product = products.find((p) => p.id === item.productId);

    const li = document.createElement("li");
    li.innerHTML = `
      <span>${product.name} - ₹${product.price} × ${item.quantity} = ₹${product.price * item.quantity}</span>
    `;

    const decreaseBtn = document.createElement("button");
    decreaseBtn.textContent = "-";
    decreaseBtn.addEventListener("click", () => updateQuantity(item.productId, -1));

    const increaseBtn = document.createElement("button");
    increaseBtn.textContent = "+";
    increaseBtn.addEventListener("click", () => updateQuantity(item.productId, 1));

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => removeFromCart(item.productId));

    li.appendChild(decreaseBtn);
    li.appendChild(increaseBtn);
    li.appendChild(removeBtn);
    cartItemsEl.appendChild(li);
  });

  cartTotalEl.textContent = `Total: ₹${calculateTotal()}`;
}

renderProducts();
renderCart(); // shows an empty cart + ₹0 total initially

/*
  WHY THE CART STORES { productId, quantity } INSTEAD OF THE FULL
  PRODUCT OBJECT: keeping just the id and looking up product details
  (price, name) from the "products" array whenever needed avoids
  DUPLICATING product data in two places - if a price ever changed,
  we'd only need to update it in ONE place (the products array), and
  the cart would automatically reflect the correct price on next render.

  TIME COMPLEXITY NOTE: .find() inside a loop (like in calculateTotal
  and renderCart) is O(n*m) in the worst case for large datasets - for
  a small product catalog like this it's totally fine, but for a real
  large-scale store you'd typically use a Map keyed by product id for
  O(1) lookups instead.
*/
