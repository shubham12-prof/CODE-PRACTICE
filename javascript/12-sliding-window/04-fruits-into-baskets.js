/*
  12. Sliding Window
  Fruits Into Baskets

  PROBLEM: you have a row of fruit trees (each tree = one type of
  fruit, given as an array). You have exactly 2 BASKETS, and each
  basket can only hold ONE type of fruit (but unlimited quantity of
  that type). Starting from any tree, pick fruit going right, but stop
  as soon as you'd need a 3rd type. Find the MAXIMUM number of fruits
  you can collect.

  In plain terms: find the length of the longest subarray that
  contains AT MOST 2 distinct values.
  Example: [1,2,1,2,3] -> 4   ([1,2,1,2] has only two types: 1 and 2)

  WHY SLIDING WINDOW FITS: this is the same "shrink when a rule is
  broken" pattern as Longest Unique Substring, just with a different
  rule: instead of "no duplicates", the rule here is "at most 2
  distinct values in the window".
*/

function totalFruit(fruits) {
  const basket = new Map(); // maps: { fruitType: countInWindow }
  let left = 0;
  let maxFruits = 0;

  for (let right = 0; right < fruits.length; right++) {
    const fruit = fruits[right];

    // Add this fruit to the window (increase its count).
    basket.set(fruit, (basket.get(fruit) || 0) + 1);

    // If we now have MORE than 2 distinct fruit types, shrink from the
    // left until we're back down to 2 types.
    while (basket.size > 2) {
      const leftFruit = fruits[left];
      basket.set(leftFruit, basket.get(leftFruit) - 1);

      // If that fruit type's count drops to 0, remove it entirely from
      // the map - it's no longer "in the window" at all.
      if (basket.get(leftFruit) === 0) {
        basket.delete(leftFruit);
      }
      left++;
    }

    // Current window (right - left + 1) always has at most 2 types now.
    maxFruits = Math.max(maxFruits, right - left + 1);
  }

  return maxFruits;
}

console.log(totalFruit([1, 2, 1])); // 3  (all 3 - only 2 types total)
console.log(totalFruit([0, 1, 2, 2])); // 3  ([1,2,2])
console.log(totalFruit([1, 2, 3, 2, 2])); // 4  ([2,3,2,2])

/*
  WALKTHROUGH for [1,2,3,2,2]:
  right=0 (1): basket={1:1}. size=1. maxFruits=1.
  right=1 (2): basket={1:1,2:1}. size=2. maxFruits=2.
  right=2 (3): basket={1:1,2:1,3:1}. size=3 -> TOO MANY, shrink:
               remove fruits[0]=1 -> basket={1:0,2:1,3:1} -> 1's count
               is 0, delete it -> basket={2:1,3:1}. left=1. size=2 now, stop.
               maxFruits stays 2 (window is now [2,3], length 2).
  right=3 (2): basket={2:2,3:1}. size=2. window=[2,3,2], length 3. maxFruits=3.
  right=4 (2): basket={2:3,3:1}. size=2. window=[2,3,2,2], length 4. maxFruits=4.
  Final answer: 4

  TIME COMPLEXITY: O(n) - same reasoning as before, left never moves
  backward, so total movement across the whole run is linear.
  SPACE COMPLEXITY: O(1) - the basket Map holds at most 3 entries
  at any moment (2 valid + 1 temporarily over, right before shrinking).
*/
