/*
  12. Sliding Window
  Longest Substring Without Repeating Characters (Longest Unique Substring)

  PROBLEM: given a string, find the length of the LONGEST substring
  that has no repeating characters.
  Example: "abcabcbb" -> 3   ("abc" is the longest with no repeats)
           "bbbbb"    -> 1   ("b")
           "pwwkew"   -> 3   ("wke")

  WHY SLIDING WINDOW FITS: we grow a window (right edge moves forward)
  as long as characters stay unique. The moment we hit a DUPLICATE, we
  shrink the window from the LEFT until the duplicate is gone. This
  avoids re-checking every possible substring (which would be O(n^2)
  or worse) - each character is only looked at a small number of times.
*/

function longestUniqueSubstring(s) {
  const seen = new Set(); // characters currently INSIDE the window
  let left = 0;           // left edge of the window
  let maxLength = 0;

  for (let right = 0; right < s.length; right++) {
    // If the character at "right" is already in our window, we have a
    // duplicate - shrink from the left until it's removed.
    while (seen.has(s[right])) {
      seen.delete(s[left]);
      left++;
    }

    // Now s[right] is safe to add - no duplicate in the window.
    seen.add(s[right]);

    // Current window size is (right - left + 1). Track the biggest one.
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}

console.log(longestUniqueSubstring("abcabcbb")); // 3  ("abc")
console.log(longestUniqueSubstring("bbbbb"));     // 1  ("b")
console.log(longestUniqueSubstring("pwwkew"));    // 3  ("wke")

/*
  WALKTHROUGH for "abcabcbb":
  right=0 ('a'): not in seen, add it. seen={a}. window="a", length 1.
  right=1 ('b'): not in seen, add it. seen={a,b}. window="ab", length 2.
  right=2 ('c'): not in seen, add it. seen={a,b,c}. window="abc", length 3. maxLength=3
  right=3 ('a'): 'a' IS in seen! Shrink: remove s[left]='a', left becomes 1.
                 Now seen={b,c}. Add 'a' back. seen={b,c,a}. window="bca", length 3.
  ...continues similarly, never beats length 3.
  Final answer: 3

  TIME COMPLEXITY: O(n) - "right" moves forward n times, and "left"
  moves forward AT MOST n times total across the whole run (never
  resets backward), so total work stays linear.
  SPACE COMPLEXITY: O(min(n, charset size)) - the Set holds at most
  one entry per unique character in the window.
*/
