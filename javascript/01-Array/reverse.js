function reverse(arr) {
    let val = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        val.push(arr[i]);
    }
    return val;
}
console.log(reverse([1, 2, 3, 4, 5]))