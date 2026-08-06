function isPalindrome(str) {

    // Reverse the string
    let reversed = str.split("").reverse().join("");

    // Compare original and reversed string
    return str === reversed;
}

console.log(isPalindrome("madam"));