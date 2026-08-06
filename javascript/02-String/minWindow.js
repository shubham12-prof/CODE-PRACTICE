function minWindow(s, t) {

    // Frequency of target characters
    let need = {};

    // Store required frequencies
    for (let char of t) {
        need[char] = (need[char] || 0) + 1;
    }

    // Number of unique characters still needed
    let required = Object.keys(need).length;

    // Left pointer
    let left = 0;

    // Start index of best window
    let start = 0;

    // Length of best window
    let minLength = Infinity;

    // Current window frequencies
    let window = {};

    // Right pointer expands window
    for (let right = 0; right < s.length; right++) {

        // Add current character
        let char = s[right];
        window[char] = (window[char] || 0) + 1;

        // Reduce required count when a character requirement is met
        if (need[char] && window[char] === need[char]) {
            required--;
        }

        // Shrink the window while it remains valid
        while (required === 0) {

            // Update smallest window found
            if (right - left + 1 < minLength) {
                minLength = right - left + 1;
                start = left;
            }

            // Remove leftmost character
            let leftChar = s[left];
            window[leftChar]--;

            // Window is no longer valid if a required character drops below its need
            if (need[leftChar] && window[leftChar] < need[leftChar]) {
                required++;
            }

            // Move left pointer
            left++;
        }
    }

    // Return smallest window or empty string if none exists
    return minLength === Infinity
        ? ""
        : s.substring(start, start + minLength);
}

console.log(minWindow("ADOBECODEBANC", "ABC"));