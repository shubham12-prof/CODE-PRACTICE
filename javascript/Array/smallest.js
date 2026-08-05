function smallest(arr) {
    let small = arr[0];
    for (let i = 0; i <= arr.length; i++) {
        if (arr[i] < small) {
            small = arr[i]
        }
    }
    return small;
}

console.log(smallest([1, 2, 3, 4, 5, 0, 6, 3, 4]))