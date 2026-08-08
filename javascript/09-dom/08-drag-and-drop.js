/*
  9.8 DOM - Drag and Drop

  ASSUMED HTML:

    <div class="column" id="todo">
      <div class="card" draggable="true">Design homepage</div>
      <div class="card" draggable="true">Write API docs</div>
    </div>

    <div class="column" id="inprogress">
      <div class="card" draggable="true">Build login form</div>
    </div>

    <div class="column" id="done"></div>

  Note: every draggable item needs draggable="true" in the HTML itself.

  CORE IDEA: use the browser's native Drag and Drop API.
  - "dragstart" fires on the item being dragged - we remember WHICH item.
  - "dragover" fires on the drop zone WHILE dragging over it - we must
    call e.preventDefault() here or dropping won't be allowed at all.
  - "drop" fires when the item is released over a valid drop zone.
*/

let draggedCard = null; // keeps track of WHICH card is being dragged

// Step 1: every card needs "dragstart" and "dragend" listeners.
function attachCardEvents(card) {
  card.addEventListener("dragstart", () => {
    draggedCard = card;
    // small delay so the "dragging" style doesn't flicker instantly
    setTimeout(() => card.classList.add("dragging"), 0);
  });

  card.addEventListener("dragend", () => {
    card.classList.remove("dragging");
    draggedCard = null;
  });
}

document.querySelectorAll(".card").forEach(attachCardEvents);

// Step 2: every column needs "dragover" and "drop" listeners.
document.querySelectorAll(".column").forEach((column) => {
  // Fires continuously while a dragged item is over this column.
  column.addEventListener("dragover", (e) => {
    e.preventDefault(); // REQUIRED - without this, "drop" won't fire
    column.classList.add("drag-over"); // visual feedback
  });

  column.addEventListener("dragleave", () => {
    column.classList.remove("drag-over");
  });

  // Fires when the card is actually released over this column.
  column.addEventListener("drop", () => {
    column.classList.remove("drag-over");
    if (draggedCard) {
      column.appendChild(draggedCard); // moves the card into this column
    }
  });
});
