Array.prototype.myFilter = function (callback) {
    const result = [];

    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            result.push(this[i]);
        }
    }

    return result;
};

const nums = [1, 2, 3, 4, 5, 6];
console.log(nums.myFilter((n) => n % 2 === 0)); // [2, 4, 6]