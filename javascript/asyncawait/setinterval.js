console.log("start");

function count() {
    let i = 0; // ✅ define i

    const interval = setInterval(() => {
        console.log("i", i);
        i++;

        if (i > 10) {
            clearInterval(interval); // ✅ correct function
        }
    }, 1000);
}

count();

console.log("end");