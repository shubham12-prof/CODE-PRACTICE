function curry(fn) {
    return function curried(...args) {
        // If we already have enough arguments to call the original
        // function, just call it now.
        if (args.length >= fn.length) {
            // fn.length tells us how many parameters the ORIGINAL function expects.
            return fn.apply(this, args);
        }

        // Otherwise, return a NEW function that collects MORE arguments,
        // combining them with what we already have.
        return function (...moreArgs) {
            return curried.apply(this, [...args, ...moreArgs]);
        };
    };
}