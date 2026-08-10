/*
  17. Mini Projects
  Search with Debounce (calling a real/simulated API as you type)

  ASSUMED HTML:
    <input type="text" id="searchInput" placeholder="Search..." />
    <div id="results"></div>
    <div id="loadingIndicator" style="display:none;">Searching...</div>

  CORE IDEA: combine the debounce() utility (see /real-interview-questions
  folder for the standalone version) with a fetch call, so we only hit
  the API once the user has PAUSED typing - instead of firing a
  request on every single keystroke, which wastes API calls and can
  cause results to arrive out of order.
*/

const searchInput = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");
const loadingIndicator = document.getElementById("loadingIndicator");

function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Simulates a search API - swap this for a real fetch() call, e.g.:
// const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
function fakeSearchAPI(query) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const allItems = ["Apple", "Banana", "Cherry", "Mango", "Orange", "Grapes"];
      const matches = allItems.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      );
      resolve(matches);
    }, 400); // fake network delay
  });
}

// A "request ID" to guard against RACE CONDITIONS: if the user types
// fast, an OLDER (slower) request might finish AFTER a newer one -
// we only want to show results from the MOST RECENT search.
let latestRequestId = 0;

async function performSearch(query) {
  if (query.trim() === "") {
    resultsDiv.innerHTML = "";
    loadingIndicator.style.display = "none";
    return;
  }

  const requestId = ++latestRequestId; // mark this specific request
  loadingIndicator.style.display = "block";

  const results = await fakeSearchAPI(query);

  // If a NEWER search has started since this one began, discard these
  // (now-outdated) results instead of showing them.
  if (requestId !== latestRequestId) return;

  loadingIndicator.style.display = "none";
  renderResults(results);
}

function renderResults(results) {
  resultsDiv.innerHTML = "";

  if (results.length === 0) {
    resultsDiv.textContent = "No results found";
    return;
  }

  results.forEach((item) => {
    const div = document.createElement("div");
    div.className = "result-item";
    div.textContent = item;
    resultsDiv.appendChild(div);
  });
}

// Wrap performSearch in debounce, so it only actually RUNS 300ms after
// the user stops typing.
const debouncedSearch = debounce(performSearch, 300);

searchInput.addEventListener("input", (e) => {
  debouncedSearch(e.target.value);
});

/*
  WHY BOTH DEBOUNCE *AND* A REQUEST ID ARE NEEDED:
  Debounce alone prevents firing a request on EVERY keystroke, but
  doesn't fully solve out-of-order responses (e.g. two debounced
  searches close together could still resolve in the wrong order over
  a flaky network). The requestId check is a small extra safeguard
  that only shows results from the LATEST search, ignoring any
  slower/older ones that finish late.
*/
