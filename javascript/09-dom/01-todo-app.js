/*
  9.1 DOM - Todo App

  ASSUMED HTML (this is what the JS below expects to already exist):

    <input type="text" id="todoInput" placeholder="Add a task..." />
    <button id="addBtn">Add</button>
    <ul id="todoList"></ul>

  CORE DOM CONCEPTS USED:
  - document.getElementById / querySelector -> grabbing elements
  - addEventListener -> reacting to clicks/keypresses
  - createElement + appendChild -> adding new elements dynamically
  - classList.toggle -> adding/removing a CSS class (for "done" state)
  - element.remove() -> deleting an element from the page
*/

// Step 1: grab the elements we need to work with.
const input = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("todoList");

// Step 2: function that creates ONE todo <li> and adds it to the list.
function addTodo() {
  const text = input.value.trim(); // trim() removes extra spaces
  if (text === "") return; // don't add empty todos

  // Create the <li> element in memory (not on page yet).
  const li = document.createElement("li");

  // A <span> holds the text - clicking it toggles "done".
  const span = document.createElement("span");
  span.textContent = text;
  span.addEventListener("click", () => {
    li.classList.toggle("done"); // adds/removes the "done" CSS class
  });

  // A delete button removes this specific <li>.
  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.addEventListener("click", () => {
    li.remove(); // removes this li from the DOM
  });

  // Put span + button inside li, then li inside the list.
  li.appendChild(span);
  li.appendChild(delBtn);
  list.appendChild(li);

  input.value = ""; // clear input box for next task
  input.focus();
}

// Step 3: wire up events.
addBtn.addEventListener("click", addTodo);

// Bonus UX: also add todo when user presses Enter inside the input.
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTodo();
});
