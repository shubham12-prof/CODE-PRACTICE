/*
  11. Data Structures - HashMap
  First Unique (Non-Repeating) Character

  PROBLEM: given a string, find the FIRST character that appears only
  ONCE, and return its index. If no unique character exists, return -1.
  Example: "leetcode"      -> 0   ('l' appears once, and is first)
           "loveleetcode"  -> 2   ('v' is the first char that appears once)
           "aabb"          -> -1  (nothing appears exactly once)

  WHY A HASHMAP FITS: we need to know HOW MANY TIMES each character
  appears. A hashmap (frequency counter) gives us that count instantly
  for any character, instead of re-scanning the whole string repeatedly.

  APPROACH: 2 passes over the string.
  1st pass: count how many times each character appears (frequency map).
  2nd pass: walk through the string IN ORDER, and return the index of
            the first character whose count is exactly 1.
*/

function firstUniqChar(s) {
  const freq = {};

  // PASS 1: build the frequency map.
  for (const char of s) {
    freq[char] = (freq[char] || 0) + 1;
  }

  // PASS 2: walk through the string IN ORDER (this is important - we
  // want the FIRST unique character by position, not just any unique one).
  for (let i = 0; i < s.length; i++) {
    if (freq[s[i]] === 1) {
      return i; // found it - return its index immediately
    }
  }

  return -1; // no unique character found anywhere
}

console.log(firstUniqChar("leetcode"));     // 0  ('l')
console.log(firstUniqChar("loveleetcode")); // 2  ('v')
console.log(firstUniqChar("aabb"));         // -1 (no unique character)

/*
  WHY WE NEED 2 PASSES (common follow-up question):
  During a single left-to-right pass, we can't yet know if a character
  we're looking at will repeat LATER in the string. So we first need a
  complete frequency count (pass 1) before we can safely say "this one
  never repeats" during pass 2.

  TIME COMPLEXITY: O(n) - two passes over the string, but 2n still
  simplifies to O(n).
  SPACE COMPLEXITY: O(k) - where k is the number of unique characters
  (at most 26 for lowercase English letters, so effectively O(1) in
  that specific case).
*/
