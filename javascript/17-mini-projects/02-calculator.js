/*
  17. Mini Projects
  Calculator

  ASSUMED HTML:
    <div id="display">0</div>
    <div class="buttons">
      <button data-value="7">7</button>
      <button data-value="8">8</button>
      ... (0-9 number buttons, each with data-value="<digit>")
      <button data-action="add">+</button>
      <button data-action="subtract">-</button>
      <button data-action="multiply">×</button>
      <button data-action="divide">÷</button>
      <button data-action="equals">=</button>
      <button data-action="clear">C</button>
      <button data-action="decimal">.</button>
    </div>

  CORE IDEA: keep track of 3 pieces of state - the current number being
  typed, the PREVIOUS number (before an operator was pressed), and
  which operation is pending. Numbers update the display directly;
  operator buttons "save" the current number and remember the
  operation; "=" performs the actual calculation.
*/

const display = document.getElementById("display");

let currentValue = "0";   // what's currently shown/being typed
let previousValue = null; // the number entered BEFORE the operator
let pendingOperation = null; // "add", "subtract", "multiply", "divide"
let shouldResetDisplay = false; // true right after pressing an operator

function updateDisplay() {
  display.textContent = currentValue;
}

function inputDigit(digit) {
  if (shouldResetDisplay) {
    // Start a fresh number - previous typing shouldn't carry over.
    currentValue = digit;
    shouldResetDisplay = false;
  } else {
    // Avoid multiple leading zeroes like "007".
    currentValue = currentValue === "0" ? digit : currentValue + digit;
  }
  updateDisplay();
}

function inputDecimal() {
  if (shouldResetDisplay) {
    currentValue = "0.";
    shouldResetDisplay = false;
    updateDisplay();
    return;
  }
  // Only add "." if there isn't one already (avoid "3.5.2").
  if (!currentValue.includes(".")) {
    currentValue += ".";
    updateDisplay();
  }
}

function calculate(a, b, operation) {
  switch (operation) {
    case "add": return a + b;
    case "subtract": return a - b;
    case "multiply": return a * b;
    case "divide": return b === 0 ? "Error" : a / b; // guard against divide by zero
    default: return b;
  }
}

function handleOperation(nextOperation) {
  const inputValue = parseFloat(currentValue);

  if (previousValue === null) {
    // First operator press - just remember the number so far.
    previousValue = inputValue;
  } else if (pendingOperation) {
    // A calculation is already pending (e.g. user chained "5 + 3 +").
    // Resolve the earlier one FIRST before starting the new one.
    const result = calculate(previousValue, inputValue, pendingOperation);
    currentValue = String(result);
    previousValue = result;
    updateDisplay();
  }

  pendingOperation = nextOperation;
  shouldResetDisplay = true;
}

function handleEquals() {
  if (pendingOperation === null || previousValue === null) return;

  const inputValue = parseFloat(currentValue);
  const result = calculate(previousValue, inputValue, pendingOperation);

  currentValue = String(result);
  previousValue = null;
  pendingOperation = null;
  shouldResetDisplay = true;
  updateDisplay();
}

function handleClear() {
  currentValue = "0";
  previousValue = null;
  pendingOperation = null;
  shouldResetDisplay = false;
  updateDisplay();
}

// Wire up all the buttons using event delegation (ONE listener on the
// container, instead of one per button - simpler and works even for
// buttons added later).
document.querySelector(".buttons").addEventListener("click", (e) => {
  const button = e.target;
  const { value, action } = button.dataset;

  if (value !== undefined) {
    inputDigit(value);
  } else if (action === "decimal") {
    inputDecimal();
  } else if (action === "equals") {
    handleEquals();
  } else if (action === "clear") {
    handleClear();
  } else if (action) {
    handleOperation(action); // add / subtract / multiply / divide
  }
});

/*
  EXAMPLE FLOW for "5 + 3 =":
  press 5: currentValue="5"
  press +: previousValue=5, pendingOperation="add", shouldResetDisplay=true
  press 3: shouldResetDisplay was true, so currentValue="3" (fresh start)
  press =: calculate(5, 3, "add") = 8. currentValue="8". Done.
*/
