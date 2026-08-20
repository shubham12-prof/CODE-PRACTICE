function deepClone(value) {
    // BASE CASE: primitives are already safe to copy directly.
    if (value === null || typeof value !== "object") {
        return value;
    }

    if (Array.isArray(value)) {
        return value.map((item) => deepClone(item));
    }

    const clonedObj = {};
    for (const key in value) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
            clonedObj[key] = deepClone(value[key]);
        }
    }
    return clonedObj;
}