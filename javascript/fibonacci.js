// Simple Fibonacci Program (Loop) — Most Common in Interviews
function fibonacci(n) {
    let a = 0;
    let b = 1;

    for (let i = 0; i < n; i++) {
        console.log(a);
        let next = a + b;
        a = b;
        b = next;
    }
}

fibonacci(10)

// Fibonacci Using Recursion
function fibonacci(n) {
    if (n <= 1) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(6));

// Return Fibonacci Series in an Array
function fibonacci(n) {
    let series = [0, 1];

    for (let i = 2; i < n; i++) {
        series[i] = series[i - 1] + series[i - 2];
    }

    return series;
}

console.log(fibonacci(10));