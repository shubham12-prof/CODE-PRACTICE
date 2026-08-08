/*
  9.3 DOM - Tabs

  ASSUMED HTML:

    <div class="tab-buttons">
      <button class="tab-btn active" data-tab="html">HTML</button>
      <button class="tab-btn" data-tab="css">CSS</button>
      <button class="tab-btn" data-tab="js">JavaScript</button>
    </div>

    <div class="tab-panel active" id="html">HTML content...</div>
    <div class="tab-panel" id="css">CSS content...</div>
    <div class="tab-panel" id="js">JS content...</div>

  Note: each button's data-tab value must match a panel's id exactly -
  that's how we connect "which button" to "which panel".

  CORE IDEA: multiple "tab buttons" + multiple "tab panels". Clicking a
  button shows its matching panel and hides the rest.
*/

const buttons = document.querySelectorAll(".tab-btn");
const panels = document.querySelectorAll(".tab-panel");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Step 1: remove "active" from ALL buttons and ALL panels.
    buttons.forEach((b) => b.classList.remove("active"));
    panels.forEach((p) => p.classList.remove("active"));

    // Step 2: add "active" back only to the clicked button.
    btn.classList.add("active");

    // Step 3: find the matching panel using the data-tab attribute,
    // which we set to match the panel's id, e.g. data-tab="css" -> #css
    const targetId = btn.getAttribute("data-tab");
    document.getElementById(targetId).classList.add("active");
  });
});
