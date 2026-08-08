/*
  9.9 DOM - Stopwatch

  ASSUMED HTML:

    <div id="display">00:00:00</div>
    <button id="startBtn">Start</button>
    <button id="stopBtn">Stop</button>
    <button id="resetBtn">Reset</button>

  CORE IDEA: use setInterval() to update the displayed time every
  10ms. Start/Stop/Reset just control WHETHER that interval is
  running and what the counted time is.
*/

const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");

let elapsedMs = 0;     // total time counted so far, in milliseconds
let intervalId = null; // holds the setInterval ID so we can stop it later
let lastTick = null;   // timestamp of the last update

// Turns milliseconds into "MM:SS:CS" (minutes:seconds:centiseconds)
function formatTime(ms) {
  const centiseconds = Math.floor((ms % 1000) / 10);
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor(ms / 1000 / 60);

  // padStart(2, "0") makes sure we always show 2 digits, e.g. "05" not "5"
  const pad = (num) => String(num).padStart(2, "0");
  return `${pad(minutes)}:${pad(seconds)}:${pad(centiseconds)}`;
}

function tick() {
  const now = Date.now();
  elapsedMs += now - lastTick; // add however much time passed since last tick
  lastTick = now;
  display.textContent = formatTime(elapsedMs);
}

startBtn.addEventListener("click", () => {
  if (intervalId) return; // already running, do nothing
  lastTick = Date.now();
  // setInterval runs tick() repeatedly every 10ms.
  // We use real elapsed time (Date.now()) instead of just counting
  // "+10ms" each time, because setInterval isn't perfectly accurate -
  // this way the displayed time stays correct even if the browser lags.
  intervalId = setInterval(tick, 10);
});

stopBtn.addEventListener("click", () => {
  clearInterval(intervalId); // stops the repeating timer
  intervalId = null;
});

resetBtn.addEventListener("click", () => {
  clearInterval(intervalId);
  intervalId = null;
  elapsedMs = 0;
  display.textContent = formatTime(0);
});
