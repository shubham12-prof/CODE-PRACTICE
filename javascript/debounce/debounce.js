function debounce(func, delay) {
    let timer;

    return function (...args) {
        clearTimeout(timer);

        timer = setTimeout(() => {
            func(...args);
        }, delay);
    };
}

function greet(name) {
    console.log("Hello", name);
}

const debouncedGreet = debounce(greet, 2000);

debouncedGreet("A");
debouncedGreet("B");
debouncedGreet("C");
debouncedGreet("D");
debouncedGreet("E");