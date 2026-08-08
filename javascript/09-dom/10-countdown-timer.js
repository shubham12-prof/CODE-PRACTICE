/*
  9.10 DOM - Countdown Timer

  ASSUMED HTML:

    <input type="number" id="secondsInput" value="10" min="1" />
    <div id="display">00:10</div>
    <button id="startBtn">Start</button>
    <button id="pauseBtn">Pause</button>
    <button id="resetBtn">Reset</button>

  ASSUMED CSS: "#display.warning" styles the text (e.g. red color) to
  warn the user time is almost up.

  CORE IDEA: similar to the stopwatch, but counting DOWN from a set
  number of seconds instead of up. Uses setInterval to tick once per
  second and stops itself automatically when it reaches 0.
*/

const display = document.getElementById("display");
const secondsInput = document.getElementById("secondsInput");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

let remainingSeconds = parseInt(secondsInput.value, 10);
let intervalId = null;

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const pad = (num) => String(num).padStart(2, "0");
  return `${pad(minutes)}:${pad(seconds)}`;
}

function updateDisplay() {
  display.textContent = formatTime(remainingSeconds);
  // Add a "warning" style (red text) when 5 seconds or less are left.
  display.classList.toggle("warning", remainingSeconds <= 5);
}

function tick() {
  remainingSeconds--;
  updateDisplay();

  if (remainingSeconds <= 0) {
    clearInterval(intervalId); // stop the timer automatically
    intervalId = null;
    display.textContent = "Time's up!";
  }
}

startBtn.addEventListener("click", () => {
  if (intervalId) return; // already running

  // If starting fresh (not resuming a pause), read the input value.
  if (remainingSeconds <= 0) {
    remainingSeconds = parseInt(secondsInput.value, 10);
  }

  updateDisplay();
  // setInterval(tick, 1000) runs tick() once every 1000ms (1 second).
  intervalId = setInterval(tick, 1000);
});

pauseBtn.addEventListener("click", () => {
  clearInterval(intervalId);
  intervalId = null;
});

resetBtn.addEventListener("click", () => {
  clearInterval(intervalId);
  intervalId = null;
  remainingSeconds = parseInt(secondsInput.value, 10);
  updateDisplay();
});

updateDisplay(); // show initial value on page load
