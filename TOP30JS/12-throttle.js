function throttle(fn, delay) {
    let isOnCooldown = false;

    return function (...args) {
        const context = this;
        if (isOnCooldown) return; // ignore calls during cooldown

        fn.apply(context, args);
        isOnCooldown = true;

        setTimeout(() => {
            isOnCooldown = false;
        }, delay);
    };
}