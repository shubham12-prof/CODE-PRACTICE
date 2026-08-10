/*
  17. Mini Projects
  Infinite Scroll (with a simulated API and Intersection Observer)

  ASSUMED HTML:
    <div id="itemList"></div>
    <div id="sentinel"></div>   <!-- an empty div at the very bottom -->
    <div id="loadingIndicator" style="display:none;">Loading...</div>

  CORE IDEA (upgraded from the basic DOM version): instead of manually
  checking scroll position with a scroll event listener (which fires
  constantly and needs throttling), we use the IntersectionObserver
  API - the browser tells us directly when the "sentinel" element
  becomes visible on screen, which is more efficient and the more
  "production-grade" approach interviewers like to see.
*/

const itemList = document.getElementById("itemList");
const sentinel = document.getElementById("sentinel");
const loadingIndicator = document.getElementById("loadingIndicator");

let currentPage = 1;
let isLoading = false;
let hasMore = true;

// Simulates a paginated API call - in a real app this would be a
// fetch() to something like `/api/items?page=${page}`.
function fetchItems(page) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const totalPages = 5; // pretend there are only 5 pages of data
      if (page > totalPages) {
        resolve([]); // no more data
        return;
      }
      const items = Array.from({ length: 10 }, (_, i) => `Item ${(page - 1) * 10 + i + 1}`);
      resolve(items);
    }, 600); // fake 600ms network delay
  });
}

async function loadNextPage() {
  if (isLoading || !hasMore) return; // guard against duplicate/extra loads

  isLoading = true;
  loadingIndicator.style.display = "block";

  const items = await fetchItems(currentPage);

  if (items.length === 0) {
    hasMore = false;
    loadingIndicator.textContent = "No more items";
  } else {
    items.forEach((item) => {
      const div = document.createElement("div");
      div.className = "item";
      div.textContent = item;
      itemList.appendChild(div);
    });
    currentPage++;
    loadingIndicator.style.display = "none";
  }

  isLoading = false;
}

// IntersectionObserver watches the "sentinel" element (an empty div
// placed at the bottom of the list) and calls our callback whenever
// it enters or leaves the visible viewport.
const observer = new IntersectionObserver(
  (entries) => {
    const sentinelEntry = entries[0];
    if (sentinelEntry.isIntersecting) {
      // The sentinel just became visible - meaning the user has
      // scrolled near the bottom - so load more content.
      loadNextPage();
    }
  },
  {
    rootMargin: "100px", // start loading a bit BEFORE the sentinel is
                          // fully on screen, for a smoother experience
  }
);

observer.observe(sentinel);

loadNextPage(); // load the very first page immediately on page load

/*
  WHY IntersectionObserver IS BETTER THAN A SCROLL LISTENER:
  A "scroll" event fires dozens of times per second while scrolling,
  and manually calculating "am I near the bottom?" on every single
  fire is wasteful (and needs throttling to avoid jank).
  IntersectionObserver instead runs efficiently in the BROWSER's own
  rendering engine and only notifies your code when visibility
  actually CHANGES - much better for performance.
*/
