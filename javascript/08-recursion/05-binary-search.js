/*
  8.5 RECURSION - Binary Search
  Finds target in a SORTED array by cutting the search area in half
  each time. Time complexity: O(log n).
*/

function binarySearch(arr, target, left = 0, right = arr.length - 1) {
  // BASE CASE 1: search area is empty -> not found.
  if (left > right) {
    return -1;
  }

  const mid = Math.floor((left + right) / 2);

  // BASE CASE 2: found it!
  if (arr[mid] === target) {
    return mid;
  }

  if (arr[mid] < target) {
    // Target must be in the RIGHT half.
    return binarySearch(arr, target, mid + 1, right);
  } else {
    // Target must be in the LEFT half.
    return binarySearch(arr, target, left, mid - 1);
  }
}

const sortedArr = [2, 5, 8, 12, 16, 23, 38, 45, 56, 72, 91];

console.log(binarySearch(sortedArr, 23));  // 5 (index of 23)
console.log(binarySearch(sortedArr, 100)); // -1 (not found)

/*
  HOW IT WORKS, step by step for searching 45:
  arr = [2, 5, 8, 12, 16, 23, 38, 45, 56, 72, 91]  (indexes 0 to 10)

  Step 1: left=0, right=10, mid=5 -> arr[5]=23 -> 23 < 45,
          search RIGHT half: left=6, right=10
  Step 2: mid=8 -> arr[8]=56 -> 56 > 45,
          search LEFT half: left=6, right=7
  Step 3: mid=6 -> arr[6]=38 -> 38 < 45,
          search RIGHT half: left=7, right=7
  Step 4: mid=7 -> arr[7]=45 -> FOUND! return 7

  Each step throws away HALF the remaining array - that's why it's fast.
*/
