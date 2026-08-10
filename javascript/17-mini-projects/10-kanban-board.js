/*
  17. Mini Projects
  Kanban Board (basic - with drag & drop and localStorage persistence)

  ASSUMED HTML:
    <div class="board">
      <div class="column" data-status="todo">
        <h3>To Do</h3>
        <div class="cards" data-status="todo"></div>
        <button class="add-card-btn" data-status="todo">+ Add Card</button>
      </div>
      <div class="column" data-status="inprogress">
        <h3>In Progress</h3>
        <div class="cards" data-status="inprogress"></div>
        <button class="add-card-btn" data-status="inprogress">+ Add Card</button>
      </div>
      <div class="column" data-status="done">
        <h3>Done</h3>
        <div class="cards" data-status="done"></div>
        <button class="add-card-btn" data-status="done">+ Add Card</button>
      </div>
    </div>

  CORE IDEA: keep ALL cards in ONE array, each with a "status" field
  ("todo" / "inprogress" / "done"). Rendering just filters the array by
  status into each column. Dragging a card between columns simply
  UPDATES that card's status field, then re-renders.
*/

const STORAGE_KEY = "kanbanCards";

function loadCards() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved
    ? JSON.parse(saved)
    : [
        { id: "1", text: "Design homepage", status: "todo" },
        { id: "2", text: "Write API docs", status: "todo" },
        { id: "3", text: "Build login form", status: "inprogress" },
        { id: "4", text: "Set up database", status: "done" },
      ];
}

function saveCards(cards) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
}

let cards = loadCards();
let draggedCardId = null; // tracks WHICH card is currently being dragged

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function render() {
  // Clear out every column's card container first.
  document.querySelectorAll(".cards").forEach((col) => (col.innerHTML = ""));

  cards.forEach((card) => {
    const cardEl = document.createElement("div");
    cardEl.className = "card";
    cardEl.textContent = card.text;
    cardEl.draggable = true; // enables the native Drag and Drop API

    cardEl.addEventListener("dragstart", () => {
      draggedCardId = card.id;
      setTimeout(() => cardEl.classList.add("dragging"), 0);
    });

    cardEl.addEventListener("dragend", () => {
      cardEl.classList.remove("dragging");
      draggedCardId = null;
    });

    // Place the card into the matching column's ".cards" container,
    // based on its "status" field.
    const targetColumn = document.querySelector(`.cards[data-status="${card.status}"]`);
    if (targetColumn) targetColumn.appendChild(cardEl);
  });
}

function moveCard(cardId, newStatus) {
  const card = cards.find((c) => c.id === cardId);
  if (card && card.status !== newStatus) {
    card.status = newStatus;
    saveCards(cards);
    render();
  }
}

function addCard(status) {
  const text = prompt("Enter card text:");
  if (!text || text.trim() === "") return;

  cards.push({ id: generateId(), text: text.trim(), status });
  saveCards(cards);
  render();
}

// Wire up drag-over / drop behavior for each column's card container.
document.querySelectorAll(".cards").forEach((columnEl) => {
  columnEl.addEventListener("dragover", (e) => {
    e.preventDefault(); // required, or "drop" will never fire
    columnEl.classList.add("drag-over");
  });

  columnEl.addEventListener("dragleave", () => {
    columnEl.classList.remove("drag-over");
  });

  columnEl.addEventListener("drop", () => {
    columnEl.classList.remove("drag-over");
    const newStatus = columnEl.dataset.status;
    if (draggedCardId) {
      moveCard(draggedCardId, newStatus);
    }
  });
});

// Wire up "+ Add Card" buttons for each column.
document.querySelectorAll(".add-card-btn").forEach((btn) => {
  btn.addEventListener("click", () => addCard(btn.dataset.status));
});

render(); // show saved (or default) cards on page load

/*
  WHY "status" ON THE CARD (instead of physically storing cards inside
  separate per-column arrays): having ONE flat array with a status
  field makes moving a card between columns a simple property update
  (card.status = "done"), rather than needing to REMOVE it from one
  array and PUSH it into another - fewer places for bugs to hide, and
  it mirrors how this kind of data is usually modeled in a real
  database (one "cards" table with a status column).
*/
