function remove(arr1, arr2) {
    const set = new Set(arr2);
    const val = [];

    for (let i = 0; i < arr1.length; i++) {
        if (!set.has(arr1[i])) {
            val.push(arr1[i]);
        }
    }

    return val;
}

console.log(remove([1, 2, 3, 4, 5], [2, 4]));