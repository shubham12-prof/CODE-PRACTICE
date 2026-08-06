function lengthOfLongestSubstring(str) {

    // Store unique characters
    let set = new Set();

    // Left pointer
    let left = 0;

    // Maximum length
    let max = 0;

    // Right pointer moves forward
    for (let right = 0; right < str.length; right++) {

        // Remove duplicate characters
        while (set.has(str[right])) {
            set.delete(str[left]);
            left++;
        }

        // Add current character
        set.add(str[right]);

        // Update maximum length
        max = Math.max(max, right - left + 1);
    }

    return max;
}

console.log(lengthOfLongestSubstring("abcabcbb"));