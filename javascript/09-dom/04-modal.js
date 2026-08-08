/*
  9.4 DOM - Modal (Popup)

  ASSUMED HTML:

    <button id="openBtn">Open Modal</button>

    <div class="overlay" id="overlay">
      <div class="modal-box">
        <h3>Hello!</h3>
        <p>Modal content...</p>
        <button id="closeBtn">Close</button>
      </div>
    </div>

  ASSUMED CSS: ".overlay" is hidden by default (e.g. display: none), and
  ".overlay.show" makes it visible.

  CORE IDEA: a hidden overlay + box, shown when a button is clicked,
  hidden again on: close button click, clicking outside the box (the
  overlay), or pressing the Escape key.
*/

const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");
const overlay = document.getElementById("overlay");

function openModal() {
  overlay.classList.add("show");
}

function closeModal() {
  overlay.classList.remove("show");
}

// 1. Open button shows the modal.
openBtn.addEventListener("click", openModal);

// 2. Close button hides it.
closeBtn.addEventListener("click", closeModal);

// 3. Clicking the dark overlay itself (NOT the box inside it) should
//    also close it. We check e.target === overlay to make sure the
//    click was directly on the background, not bubbling up from the box.
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    closeModal();
  }
});

// 4. Pressing Escape key closes it too - good accessibility practice.
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});
