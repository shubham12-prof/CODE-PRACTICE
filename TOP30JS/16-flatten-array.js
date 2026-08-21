function flatten(arr) {
    let result = [];
    for (const item of arr) {
        if (Array.isArray(item)) {
            result = result.concat(flatten(item));
        }
        else {
            result.push(item);
        }
    }
    return result;
}

console.log(flatten([1, 2, 3, [3, 4], 4, 7, [6, 9]]))

console.log(([1, 2, 3, [3, 4], 4, 7, [6, 9]].flat(Infinity)));