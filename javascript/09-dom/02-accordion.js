/*
  9.2 DOM - Accordion

  ASSUMED HTML (repeated block for each FAQ item):

    <div class="accordion-item">
      <div class="accordion-header">
        <span>Question text</span>
        <span class="arrow">›</span>
      </div>
      <div class="accordion-body">Answer text</div>
    </div>
    (repeat .accordion-item as many times as needed)

  ASSUMED CSS: ".accordion-item.open .accordion-body" is styled to be
  visible (e.g. max-height set), and it's hidden by default otherwise.

  CORE IDEA: each "item" has a header (click target) and a body (content
  that expands/collapses). We toggle a CSS class on click to show/hide.
*/

// Step 1: get ALL accordion items as a list (NodeList).
const items = document.querySelectorAll(".accordion-item");

// Step 2: loop through each item and attach a click listener to its header.
items.forEach((item) => {
  const header = item.querySelector(".accordion-header");

  header.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");

    // OPTIONAL BEHAVIOR: close all items first (so only one is open
    // at a time). Comment this loop out if you want multiple open.
    items.forEach((other) => other.classList.remove("open"));

    // If it wasn't already open, open it now.
    // (if it WAS open, we just closed it above and leave it closed)
    if (!isOpen) {
      item.classList.add("open");
    }
  });
});
