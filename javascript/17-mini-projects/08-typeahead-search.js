/*
  17. Mini Projects
  Typeahead Search (autocomplete dropdown with keyboard navigation)

  ASSUMED HTML:
    <div class="typeahead-wrapper">
      <input type="text" id="typeaheadInput" placeholder="Search fruits..." autocomplete="off" />
      <ul id="suggestionsList" class="suggestions"></ul>
    </div>

  CORE IDEA: as the user types, show a dropdown of MATCHING suggestions
  below the input. Support clicking a suggestion OR using arrow
  keys + Enter to select one (this keyboard support is what usually
  separates a "search filter" from a proper "typeahead" component).
*/

const input = document.getElementById("typeaheadInput");
const suggestionsList = document.getElementById("suggestionsList");

const allFruits = [
  "Apple", "Apricot", "Banana", "Blueberry", "Cherry",
  "Grape", "Grapefruit", "Kiwi", "Lemon", "Mango",
  "Orange", "Papaya", "Peach", "Pear", "Pineapple",
];

let activeIndex = -1; // which suggestion is currently highlighted (-1 = none)
let currentMatches = [];

function getMatches(query) {
  if (query.trim() === "") return [];
  const lowerQuery = query.toLowerCase();
  return allFruits.filter((fruit) => fruit.toLowerCase().startsWith(lowerQuery));
}

function renderSuggestions() {
  suggestionsList.innerHTML = "";
  activeIndex = -1; // reset highlight whenever the list changes

  currentMatches.forEach((fruit, index) => {
    const li = document.createElement("li");
    li.textContent = fruit;
    li.addEventListener("click", () => selectSuggestion(fruit));
    // Highlight on mouse hover too, keeping it in sync with keyboard nav.
    li.addEventListener("mouseenter", () => setActiveIndex(index));
    suggestionsList.appendChild(li);
  });

  suggestionsList.style.display = currentMatches.length > 0 ? "block" : "none";
}

function setActiveIndex(index) {
  activeIndex = index;
  // Update which <li> has the "active" CSS class (visual highlight).
  [...suggestionsList.children].forEach((li, i) => {
    li.classList.toggle("active", i === activeIndex);
  });
}

function selectSuggestion(fruit) {
  input.value = fruit;
  suggestionsList.innerHTML = "";
  suggestionsList.style.display = "none";
  currentMatches = [];
}

input.addEventListener("input", () => {
  currentMatches = getMatches(input.value);
  renderSuggestions();
});

// Keyboard navigation: ArrowDown/ArrowUp move the highlight, Enter
// selects the highlighted item, Escape closes the dropdown.
input.addEventListener("keydown", (e) => {
  if (currentMatches.length === 0) return;

  if (e.key === "ArrowDown") {
    e.preventDefault(); // stop the cursor from moving inside the input
    const nextIndex = (activeIndex + 1) % currentMatches.length; // wrap around
    setActiveIndex(nextIndex);
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    const prevIndex = (activeIndex - 1 + currentMatches.length) % currentMatches.length;
    setActiveIndex(prevIndex);
  } else if (e.key === "Enter") {
    if (activeIndex >= 0) {
      selectSuggestion(currentMatches[activeIndex]);
    }
  } else if (e.key === "Escape") {
    suggestionsList.style.display = "none";
  }
});

// Close the dropdown if the user clicks anywhere OUTSIDE the input/list.
document.addEventListener("click", (e) => {
  if (!e.target.closest(".typeahead-wrapper")) {
    suggestionsList.style.display = "none";
  }
});

/*
  WHY % (MODULO) FOR ARROW KEY NAVIGATION: pressing ArrowDown on the
  LAST suggestion should wrap back around to the FIRST one, not go out
  of bounds. (activeIndex + 1) % length handles that wrap-around
  automatically - same trick used in the Image Slider mini project.

  REAL-WORLD NOTE: this uses a static local array for matching. A real
  typeahead usually debounces an API call instead (see the "Search
  with Debounce" file in this same folder) once the dataset is too
  large to filter instantly on the client.
*/
