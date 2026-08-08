/*
  9.6 DOM - Infinite Scroll

  ASSUMED HTML:

    <div id="list"></div>
    <div class="loading" id="loading">Scroll down to load more...</div>

  CORE IDEA: listen for the scroll event, check if the user has
  scrolled near the BOTTOM of the page, and if so, load more items.

  Key formula to detect "near bottom":
    window.innerHeight + window.scrollY >= document.body.offsetHeight - threshold
*/

const list = document.getElementById("list");
const loadingEl = document.getElementById("loading");

let itemCount = 0;     // how many items we've loaded so far
let isLoading = false; // prevents loading multiple batches at once

// Step 1: function that adds a batch of new items to the page.
function loadMoreItems() {
  if (isLoading) return; // guard: don't fire twice while already loading
  isLoading = true;
  loadingEl.textContent = "Loading...";

  // Simulate a network request with setTimeout (in a real app this
  // would be a fetch() call to an API).
  setTimeout(() => {
    for (let i = 0; i < 10; i++) {
      itemCount++;
      const div = document.createElement("div");
      div.className = "item";
      div.textContent = `Item #${itemCount}`;
      list.appendChild(div);
    }
    isLoading = false;
    loadingEl.textContent = "Scroll down to load more...";
  }, 500); // fake 500ms network delay
}

// Step 2: listen for scroll events on the window.
window.addEventListener("scroll", () => {
  const scrolledToBottom =
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 150;
    // "-150" means "start loading a bit BEFORE hitting the exact bottom"

  if (scrolledToBottom) {
    loadMoreItems();
  }
});

// Step 3: load the first batch immediately on page load.
loadMoreItems();
