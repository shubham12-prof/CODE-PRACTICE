/*
  15. Real Interview Questions
  Event Emitter

  PROBLEM: build a simple pub/sub (publish-subscribe) system: code can
  "subscribe" to a named event (on), and other code can "fire" that
  event later (emit), running every subscribed callback with any data
  passed along. This is the same core idea behind Node's EventEmitter
  and things like DOM addEventListener.

  CORE IDEA: keep an object/map where each KEY is an event name, and
  each VALUE is an ARRAY of callback functions subscribed to it. emit()
  just loops through that array and calls each one.
*/

class EventEmitter {
  constructor() {
    // Maps: { eventName: [callback1, callback2, ...] }
    this.events = {};
  }

  // Subscribe a callback to an event name.
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);

    // Returning an "unsubscribe" function is a nice bonus feature -
    // lets the caller easily remove this specific listener later.
    return () => this.off(eventName, callback);
  }

  // Remove a specific callback from an event.
  off(eventName, callback) {
    if (!this.events[eventName]) return;
    this.events[eventName] = this.events[eventName].filter(
      (cb) => cb !== callback
    );
  }

  // Fire an event - runs every subscribed callback with the given args.
  emit(eventName, ...args) {
    if (!this.events[eventName]) return; // no one is listening, do nothing
    // Loop over a COPY of the array (.slice()) in case a callback
    // modifies the listeners list while we're iterating (e.g. calls off()).
    this.events[eventName].slice().forEach((callback) => {
      callback(...args);
    });
  }

  // Subscribe to an event, but only let it fire ONE time, then auto-remove.
  once(eventName, callback) {
    const wrapper = (...args) => {
      callback(...args);
      this.off(eventName, wrapper); // clean up after first run
    };
    this.on(eventName, wrapper);
  }
}

// -----------------------------------------------------------------
// Example usage
// -----------------------------------------------------------------
const emitter = new EventEmitter();

function onUserLogin(username) {
  console.log(`${username} just logged in!`);
}

emitter.on("login", onUserLogin);
emitter.emit("login", "Priya"); // Priya just logged in!

emitter.once("signup", (username) => {
  console.log(`${username} signed up (fires only once)`);
});
emitter.emit("signup", "Tara"); // Tara signed up (fires only once)
emitter.emit("signup", "Tara"); // (nothing happens - already unsubscribed)

const unsubscribe = emitter.on("logout", () => console.log("User logged out"));
emitter.emit("logout"); // User logged out
unsubscribe(); // remove that listener
emitter.emit("logout"); // (nothing happens now)

/*
  TIME COMPLEXITY: emit() is O(k) where k is the number of listeners
  for that event. on()/off() are O(1) / O(k) respectively.
*/
