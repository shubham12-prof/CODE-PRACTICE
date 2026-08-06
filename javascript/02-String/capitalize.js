function capitalize(str) {

    // Get first character
    let first = str.charAt(0).toUpperCase();

    // Get remaining string
    let rest = str.slice(1);

    // Join both
    return first + rest;
}

console.log(capitalize("javascript"));