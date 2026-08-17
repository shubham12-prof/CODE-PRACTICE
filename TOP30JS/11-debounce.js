function debounce(fn, delay) {
    let timeoutId;

    return function (...args) {
        const context = this;
        clearTimeout(timeoutId); // cancel the previous pending call
        timeoutId = setTimeout(() => {
            fn.apply(context, args);
        }, delay);
    };
}