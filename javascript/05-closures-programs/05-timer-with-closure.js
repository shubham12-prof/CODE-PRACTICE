// PROGRAM 5: Timer with Closure
// -------------------------------------
// We use a closure to keep track of seconds passed, while giving
// the outside world simple start/stop/reset controls.

function createTimer() {
  let seconds = 0; // private, keeps counting up
  let intervalId = null; // keeps track of the running timer

  return {
    start: function () {
      // avoid starting multiple timers at once
      if (intervalId !== null) {
        console.log("Timer is already running!");
        return;
      }

      intervalId = setInterval(function () {
        seconds = seconds + 1;
        console.log("Seconds passed:", seconds);
      }, 1000);
    },
    stop: function () {
      clearInterval(intervalId);
      intervalId = null;
      console.log("Timer stopped at", seconds, "seconds");
    },
    reset: function () {
      seconds = 0;
      console.log("Timer reset");
    },
    getSeconds: function () {
      return seconds;
    },
  };
}

// ---------------- Example usage ----------------
const timer = createTimer();

timer.start(); // starts counting: 1, 2, 3 ... every second

// stop the timer after 3.5 seconds, just for this demo
setTimeout(function () {
  timer.stop();
  console.log("Final time:", timer.getSeconds());
}, 3500);

module.exports = { createTimer };
