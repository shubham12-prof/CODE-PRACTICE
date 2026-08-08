function palindrom(str) {
    let val = "";
    for (let i = str.length - 1; i >= 0; i--) {
        val += str[i];
    }
    if (val == str) {
        return "yes it's palindrome";
    }
    else {
        return "no it's not palindrome";
    }
}

console.log(palindrom("aaaaa"))