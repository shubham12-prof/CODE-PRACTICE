function isAnagram(str1, str2) {

    // Compare sorted strings
    return str1.split("").sort().join("") ===
        str2.split("").sort().join("");
}

console.log(isAnagram("listen", "silent"));