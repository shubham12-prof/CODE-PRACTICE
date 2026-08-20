function memoize(fn) {
    const cache = new Map(); // maps: "stringified arguments" -> result

    return function (...args) {
        // Turn the arguments into a single string to use as a cache key.
        // (works well for simple/primitive arguments - objects/arrays as
        // args need a smarter key strategy in real-world code)
        const key = JSON.stringify(args);

        if (cache.has(key)) {
            console.log("Returning from cache for:", key);
            return cache.get(key);
        }

        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
}