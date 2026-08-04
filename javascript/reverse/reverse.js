// let str = "shubham";

// function reverse() {
//     const data = str.split("").reverse().join("")
//     console.log(data)
// }
// reverse();

function reverse(str) {
    let str1 = "";

    for (let i = str.length - 1; i >= 0; i--) {
        str1 += str[i];
    }

    console.log(str1);
}

reverse("hello");