function merge(intervals) {

    // Sort intervals according to starting point
    intervals.sort((a, b) => a[0] - b[0]);

    // Store merged intervals
    let result = [];

    // Put first interval
    result.push(intervals[0]);

    // Traverse remaining intervals
    for (let i = 1; i < intervals.length; i++) {

        // Get last interval
        let last = result[result.length - 1];

        // Check overlap
        if (intervals[i][0] <= last[1]) {

            // Merge intervals
            last[1] = Math.max(last[1], intervals[i][1]);

        } else {

            // No overlap
            result.push(intervals[i]);
        }
    }

    return result;
}

console.log(merge([[1, 3], [2, 6], [8, 10], [15, 18]]));