
// 1  Using Sorting
function secondLargest(arr) {
    arr.sort((a, b) => b - a);

    return arr[1];
}

console.log(secondLargest([4, 2, 7, 1, 9, 5]));

// 2

function secondLargest(arr) {

    // Assume there is no largest and second largest initially
    let largest = -Infinity;
    let secondLargest = -Infinity;

    // Traverse the array one time
    for (let i = 0; i < arr.length; i++) {

        // If the current element is greater than the largest
        if (arr[i] > largest) {

            // The old largest becomes the second largest
            secondLargest = largest;

            // Update the largest with the current element
            largest = arr[i];

        }

        // If the current element is smaller than the largest
        // but greater than the second largest
        else if (arr[i] > secondLargest && arr[i] !== largest) {

            // Update the second largest
            secondLargest = arr[i];
        }
    }

    // Return the second largest number
    return secondLargest;
}

// Test
console.log(secondLargest([4, 2, 7, 1, 9, 5]));
