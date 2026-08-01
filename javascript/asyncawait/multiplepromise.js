console.log("start")
function step1() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("step 1 is completed");
            resolve("data from step 1")
        }, 1000)
    })
}

function step2() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("step 2 is completed");
            resolve("data from step 2")
        }, 1000)
    })
}

function finalstep(prevData) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("final step is done", prevData)
            resolve("All step completed")
        }, 1000)
    })
}
step1()
    .then(step2)
    .then(finalstep)
    .then((finalstep) => {
        console.log("finalmsg")
    })
console.log("end")