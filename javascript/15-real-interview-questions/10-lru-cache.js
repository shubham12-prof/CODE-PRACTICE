/*
  15. Real Interview Questions
  LRU Cache (Least Recently Used)

  PROBLEM: build a cache with a FIXED capacity. When it's full and a
  NEW item needs to be added, evict (remove) the LEAST RECENTLY USED
  item first. Both get() and put() should run in O(1) time.

  WHY A MAP FITS PERFECTLY: JavaScript's Map remembers INSERTION ORDER,
  and lets us delete + re-insert a key to "move it to the end" in O(1).
  We treat "end of the Map" as "most recently used", and "start of the
  Map" as "least recently used" (the next thing to evict).
*/

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map(); // maintains insertion order automatically
  }

  get(key) {
    if (!this.cache.has(key)) {
      return -1; // not found
    }

    // Found it - this key was just USED, so we need to mark it as
    // "most recently used". We do that by deleting and re-inserting it,
    // which moves it to the END of the Map's iteration order.
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);

    return value;
  }

  put(key, value) {
    // If the key already exists, remove it first - we're about to
    // re-insert it at the end anyway (marks it as recently used).
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // Cache is full AND this is a genuinely new key - evict the
      // LEAST recently used item, which is the FIRST key in the Map
      // (Maps iterate in insertion order, so .keys().next() gives us
      // the oldest/least-recently-touched entry).
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }

    this.cache.set(key, value); // insert at the end (most recently used)
  }
}

// -----------------------------------------------------------------
// Example usage
// -----------------------------------------------------------------
const lru = new LRUCache(2); // capacity of 2

lru.put(1, "a");
lru.put(2, "b");
console.log(lru.get(1)); // "a"  (1 is now most recently used)

lru.put(3, "c"); // cache full (size=2) -> evicts key 2 (least recently used)
console.log(lru.get(2)); // -1  (evicted, not found)

console.log(lru.get(1)); // "a"
console.log(lru.get(3)); // "c"

/*
  WALKTHROUGH:
  put(1,"a"): cache = {1:a}
  put(2,"b"): cache = {1:a, 2:b}
  get(1): move 1 to the end -> cache = {2:b, 1:a}. Returns "a".
  put(3,"c"): cache is full (size 2). Evict oldest = key 2 (first in
              map order). cache = {1:a}, then add 3 -> cache = {1:a, 3:c}
  get(2): not found -> -1 ✅

  TIME COMPLEXITY: O(1) for both get() and put() - Map's has/get/set/
  delete are all O(1), and .keys().next() to find the oldest key is
  also O(1) (it doesn't scan the whole Map, just grabs the first entry).
  SPACE COMPLEXITY: O(capacity) - the Map never holds more than
  "capacity" entries.
*/
