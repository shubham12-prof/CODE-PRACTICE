/*
  13. Two Pointers
  Remove Duplicates (from a SORTED array, in-place)

  PROBLEM: given a SORTED array, remove duplicates IN-PLACE (without
  using extra array space) so each element appears only once. Return
  the new length. The array must be sorted for this trick to work.
  Example: [1,1,2,2,3] -> length 3, array becomes [1,2,3,...]

  WHY TWO POINTERS FIT: since the array is sorted, all duplicates of a
  value sit right NEXT to each other. We use:
  - "slow" pointer: marks where the next UNIQUE value should be written.
  - "fast" pointer: scans ahead looking for the next value different
    from what "slow" is currently pointing at.
  This lets us overwrite duplicates in-place, in a single pass.
*/

function removeDuplicates(nums) {
  if (nums.length === 0) return 0;

  let slow = 0; // index of the last confirmed-unique value

  for (let fast = 1; fast < nums.length; fast++) {
    // If we find a value DIFFERENT from what "slow" points to, it's a
    // new unique value - move slow forward and write it there.
    if (nums[fast] !== nums[slow]) {
      slow++;
      nums[slow] = nums[fast];
    }
    // If nums[fast] === nums[slow], it's a duplicate - just skip it
    // (fast keeps moving, slow stays put).
  }

  // slow is the index of the LAST unique element, so length = slow + 1.
  return slow + 1;
}

const arr = [1, 1, 2, 2, 3, 4, 4];
const newLength = removeDuplicates(arr);
console.log(newLength);              // 4
console.log(arr.slice(0, newLength)); // [1, 2, 3, 4]

/*
  WALKTHROUGH for [1,1,2,2,3]:
  slow=0 (nums[0]=1)
  fast=1: nums[1]=1, same as nums[slow]=1 -> skip (duplicate).
  fast=2: nums[2]=2, different from nums[slow]=1 -> slow becomes 1,
          write nums[1]=2. Array so far: [1,2,2,2,3]
  fast=3: nums[3]=2, same as nums[slow]=2 -> skip.
  fast=4: nums[4]=3, different from nums[slow]=2 -> slow becomes 2,
          write nums[2]=3. Array so far: [1,2,3,2,3]
  End: slow=2, so length = 3. First 3 elements [1,2,3] are the answer.
  (anything after index "slow" is leftover garbage and gets ignored)

  TIME COMPLEXITY: O(n) - single pass with the fast pointer.
  SPACE COMPLEXITY: O(1) - modifies the array in-place, no extra array.
*/
