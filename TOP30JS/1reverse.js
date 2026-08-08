function reverse(str) {
    let char = "";
    for (let i = str.length - 1; i >= 0; i--) {
        char += str[i]
    }
    return char;
}

console.log(reverse("hello"))