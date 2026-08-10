/*
  14. Binary Search
  Square Root (integer square root, no Math.sqrt allowed)

  PROBLEM: given a non-negative integer x, return the FLOOR (rounded
  down) of its square root, WITHOUT using Math.sqrt() or ** 0.5.
  Example: x=8 -> 2   (sqrt(8) ≈ 2.828, floor is 2)
           x=4 -> 2   (exact)

  WHY BINARY SEARCH FITS: we're essentially SEARCHING for a number,
  guessing values between 0 and x, and checking "is guess*guess too
  big, too small, or just right?" - that's exactly the binary search
  pattern, just applied to a range of possible ANSWERS instead of
  array indices.
*/

function mySqrt(x) {
  if (x < 2) return x; // handles x=0 and x=1 directly (sqrt is itself)

  let left = 1;
  let right = x;
  let answer = 1; // will hold the best valid guess found so far

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    const square = mid * mid;

    if (square === x) {
      return mid; // exact square root found
    } else if (square < x) {
      // mid*mid is too small - mid COULD be the floor answer, but
      // maybe something bigger also works, so remember it and keep
      // searching to the right for something even closer.
      answer = mid;
      left = mid + 1;
    } else {
      // mid*mid is too big - search smaller values.
      right = mid - 1;
    }
  }

  return answer;
}

console.log(mySqrt(8));  // 2  (floor of 2.828)
console.log(mySqrt(4));  // 2  (exact)
console.log(mySqrt(1));  // 1
console.log(mySqrt(0));  // 0
console.log(mySqrt(100)); // 10

/*
  WALKTHROUGH for x=8:
  left=1, right=8: mid=4, 4*4=16. 16 > 8 -> too big, right=3.
  left=1, right=3: mid=2, 2*2=4. 4 < 8 -> too small, answer=2, left=3.
  left=3, right=3: mid=3, 3*3=9. 9 > 8 -> too big, right=2.
  left=3, right=2: loop ends (left > right). Return answer = 2. ✅

  WHY WE TRACK "answer" SEPARATELY: since we want the FLOOR (not an
  exact match, which might not exist), whenever mid*mid is smaller
  than x, mid is a VALID candidate answer - but there might be a
  bigger valid one too, so we keep it saved and keep searching right.

  TIME COMPLEXITY: O(log x) - binary search over the range [1, x].
  SPACE COMPLEXITY: O(1)
*/
