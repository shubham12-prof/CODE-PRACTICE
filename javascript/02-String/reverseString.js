function reverseString(str) {

    // Convert string into array
    let arr = str.split("");

    // Reverse the array
    arr.reverse();

    // Convert array back to string
    return arr.join("");
}

console.log(reverseString("hello"));