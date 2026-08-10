/*
  17. Mini Projects
  Pagination

  ASSUMED HTML:
    <div id="itemList"></div>
    <div id="paginationControls"></div>

  CORE IDEA: keep ALL the data in memory (or fetched once), but only
  RENDER a "slice" of it at a time, based on the current page number.
  Page buttons just change which slice gets shown - no re-fetching
  needed if data is already local.
*/

// Example dataset - in a real app this might come from an API instead.
const allItems = Array.from({ length: 47 }, (_, i) => `Item ${i + 1}`);

const ITEMS_PER_PAGE = 10;
let currentPage = 1;

const itemList = document.getElementById("itemList");
const paginationControls = document.getElementById("paginationControls");

function getTotalPages() {
  return Math.ceil(allItems.length / ITEMS_PER_PAGE);
}

function renderItems() {
  itemList.innerHTML = "";

  // Calculate which slice of "allItems" belongs to the current page.
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const pageItems = allItems.slice(startIndex, endIndex);

  pageItems.forEach((item) => {
    const div = document.createElement("div");
    div.className = "item";
    div.textContent = item;
    itemList.appendChild(div);
  });
}

function renderControls() {
  paginationControls.innerHTML = "";
  const totalPages = getTotalPages();

  // "Previous" button.
  const prevBtn = document.createElement("button");
  prevBtn.textContent = "‹ Prev";
  prevBtn.disabled = currentPage === 1; // can't go back from page 1
  prevBtn.addEventListener("click", () => goToPage(currentPage - 1));
  paginationControls.appendChild(prevBtn);

  // One button per page number.
  for (let page = 1; page <= totalPages; page++) {
    const pageBtn = document.createElement("button");
    pageBtn.textContent = page;
    if (page === currentPage) pageBtn.classList.add("active");
    pageBtn.addEventListener("click", () => goToPage(page));
    paginationControls.appendChild(pageBtn);
  }

  // "Next" button.
  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Next ›";
  nextBtn.disabled = currentPage === totalPages; // can't go past the last page
  nextBtn.addEventListener("click", () => goToPage(currentPage + 1));
  paginationControls.appendChild(nextBtn);
}

function goToPage(page) {
  const totalPages = getTotalPages();
  // Clamp the page number so we never go below 1 or above totalPages.
  currentPage = Math.max(1, Math.min(page, totalPages));

  renderItems();
  renderControls(); // re-render controls too, so the "active" button updates
}

// Initial render on page load.
renderItems();
renderControls();

/*
  WALKTHROUGH: with 47 items and 10 per page, getTotalPages() = 5
  (ceil(47/10) = 5). Page 1 shows items 0-9, page 2 shows items 10-19,
  ..., page 5 shows items 40-46 (only 7 items on the last page - slice()
  automatically handles running out of items, no special case needed).

  REAL-WORLD NOTE: this example paginates data ALREADY in memory. If
  data comes from an API, you'd typically send the page number (and
  items-per-page) as query params to the server instead, and let the
  SERVER return just that page's worth of data - avoiding loading
  everything up front for large datasets.
*/
