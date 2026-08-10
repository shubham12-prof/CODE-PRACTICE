/*
  13. Two Pointers
  Container With Most Water

  PROBLEM: given an array of heights (each representing a vertical
  line), find TWO lines that, together with the x-axis, form a
  container that holds the MOST water. Return the max area.
  Example: [1,8,6,2,5,4,8,3,7] -> 49

  Area between two lines at index i and j =
    (distance between them) * (shorter of the two heights)
    -> (j - i) * min(height[i], height[j])

  WHY TWO POINTERS FIT: brute force checks EVERY pair (O(n^2) - slow).
  Instead, start with the WIDEST possible container (left=0, right=end)
  and shrink inward. At each step, move the pointer at the SHORTER
  line inward - because that shorter line is the bottleneck limiting
  the area, and the only way to POSSIBLY find something bigger is to
  look for a taller line to replace it. Moving the taller line inward
  could only ever shrink the area (width decreases, height can't improve
  past the shorter one), so it's never worth doing.
*/

function maxArea(height) {
  let left = 0;
  let right = height.length - 1;
  let maxWater = 0;

  while (left < right) {
    const width = right - left;
    const shorterHeight = Math.min(height[left], height[right]);
    const area = width * shorterHeight;

    maxWater = Math.max(maxWater, area);

    // Move the pointer at the SHORTER line - it's the limiting factor.
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxWater;
}

console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])); // 49
console.log(maxArea([1, 1]));                       // 1

/*
  WALKTHROUGH for [1,8,6,2,5,4,8,3,7]:
  left=0(h=1), right=8(h=7): width=8, shorter=1, area=8. maxWater=8.
    height[left]=1 < height[right]=7 -> move left forward.
  left=1(h=8), right=8(h=7): width=7, shorter=7, area=49. maxWater=49.
    height[left]=8 > height[right]=7 -> move right backward.
  left=1(h=8), right=7(h=3): width=6, shorter=3, area=18. maxWater stays 49.
    ...continues, but nothing beats 49.
  Final answer: 49

  WHY THIS GREEDY MOVE IS SAFE (common follow-up question):
  If we move the TALLER line's pointer inward instead, the width
  shrinks AND the height is still capped by the shorter line (or
  worse) - so the area can only get smaller or stay the same, NEVER
  bigger. So there's no point ever moving the taller pointer first;
  only moving the shorter one gives any chance of improvement.

  TIME COMPLEXITY: O(n) - left and right pointers move toward each
  other, meeting after at most n steps total.
  SPACE COMPLEXITY: O(1) - just a few tracking variables.
*/
