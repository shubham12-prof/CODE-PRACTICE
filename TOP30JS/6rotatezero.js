function rotate(nums, k) {
    const n = nums.length;
    k = k % n;
    const lastK = nums.slice(n - k);
    const restk = nums.slice(0, n - k);

    return [...lastK, ...restk]
}
console.log(rotate([1, 2, 3, 4, 5, 6, 7], 3))