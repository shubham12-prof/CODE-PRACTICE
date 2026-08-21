Array.prototype.myMap = function (callback) {
    const result = [];

    for (let i = 0; i < this.length; i++) {
        result.push(callback(this[i], i, this)); // (element, index, array)
    }

    return result;
};


const nums = [1, 2, 3, 4];
console.log(nums.myMap((n) => n * 2)); // [2, 4, 6, 8]
console.log(nums); 