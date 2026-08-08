/*
  9.7 DOM - Search Filter

  ASSUMED HTML:

    <input type="text" id="searchInput" placeholder="Search..." />
    <ul id="list">
      <li>Apple</li>
      <li>Banana</li>
      <li>Cherry</li>
      ... more <li> items ...
    </ul>
    <div class="no-results" id="noResults">No matches found.</div>

  ASSUMED CSS: "li.hidden { display: none; }" and "#noResults" is
  hidden by default.

  CORE IDEA: listen for typing in an input, and on every keystroke,
  loop through a list of items and show/hide each one depending on
  whether its text matches what was typed.
*/

const input = document.getElementById("searchInput");
const items = document.querySelectorAll("#list li");
const noResults = document.getElementById("noResults");

// "input" event fires every time the value changes (typing, pasting, etc.)
input.addEventListener("input", () => {
  // toLowerCase() so the search is NOT case-sensitive.
  const query = input.value.toLowerCase().trim();
  let matchCount = 0;

  items.forEach((item) => {
    const text = item.textContent.toLowerCase();

    // includes() checks if "text" contains "query" ANYWHERE in it.
    const isMatch = text.includes(query);

    // toggle("hidden", condition) adds the class if condition is true,
    // removes it if false - shorter than an if/else block.
    item.classList.toggle("hidden", !isMatch);

    if (isMatch) matchCount++;
  });

  // Show a "no results" message only when nothing matched.
  noResults.style.display = matchCount === 0 ? "block" : "none";
});
