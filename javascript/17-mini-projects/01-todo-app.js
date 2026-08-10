/*
  17. Mini Projects
  Todo App (with localStorage persistence)

  ASSUMED HTML:
    <input type="text" id="todoInput" placeholder="Add a task..." />
    <button id="addBtn">Add</button>
    <ul id="todoList"></ul>

  WHAT MAKES THIS A "MINI PROJECT" (vs the basic DOM version):
  tasks are SAVED to localStorage, so they persist even after the
  page is refreshed or closed and reopened.
*/

const input = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("todoList");

const STORAGE_KEY = "todos";

// Load saved todos from localStorage, or start with an empty array.
function loadTodos() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

// Save the current todos array back to localStorage.
function saveTodos(todos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

let todos = loadTodos(); // in-memory copy we work with

// Rebuild the entire <ul> from the "todos" array. Simpler and less
// error-prone than trying to manually patch individual DOM elements.
function render() {
  list.innerHTML = ""; // clear existing list first

  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    if (todo.done) li.classList.add("done");

    const span = document.createElement("span");
    span.textContent = todo.text;
    span.addEventListener("click", () => toggleTodo(index));

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", () => deleteTodo(index));

    li.appendChild(span);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

function addTodo() {
  const text = input.value.trim();
  if (text === "") return;

  todos.push({ text, done: false });
  saveTodos(todos);
  render();

  input.value = "";
  input.focus();
}

function toggleTodo(index) {
  todos[index].done = !todos[index].done;
  saveTodos(todos);
  render();
}

function deleteTodo(index) {
  todos.splice(index, 1); // remove 1 item at "index"
  saveTodos(todos);
  render();
}

addBtn.addEventListener("click", addTodo);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTodo();
});

render(); // show whatever was saved from a previous session, on page load

/*
  KEY CONCEPT - "single source of truth": instead of manually adding/
  removing individual DOM elements everywhere, we keep ONE array
  ("todos") as the real data, and every change re-renders the WHOLE
  list from that array. This is the same core idea frameworks like
  React are built around, just done manually here.
*/
