function merge(arr1, arr2) {
    let val = [];

    for (let i = 0; i < arr1.length; i++) {
        val.push(arr1[i])
    }
    for (let i = 0; i < arr2.length; i++) {
        val.push(arr2[i])

    }
    return val;
}

console.log(merge([1, 2, 1, 2, 1, 2, 1], [2, 3, 1, 2, 34]))


// Using the Spread Operator

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

const merged = [...arr1, ...arr2];
console.log(merged);

// Using concat()

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

const merged = arr1.concat(arr2);

console.log(merged);