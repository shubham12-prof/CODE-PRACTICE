
// // settimeout
// setTimeout(() => {
//     console.log("hello")
// }, 2000)


// //setinterval
// let count = 1;
// const interval = setInterval(() => {
//     console.log("count", count)
//     count++;
//     if (count > 10) clearInterval(interval)
// }, 1000)

//fake api function that returns data after 3 seconds (using a promises)

// function fakeApi() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve("data recived from api")
//         }, 3000)
//     })
// }
// fakeApi().then((data) => {
//     console.log(data, "data")
// })

//for multiple promises

function step1() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("step 1 completed")
            resolve("data from setp1")
        }, 1000)
    })
}
function step2(prevData) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("step 2 done", prevData)
            resolve("data from step2")
        }, 1000)
    })
}

function finalstep(prevData) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("final step done ", prevData)
            resolve("all step done")
        }, 1000)
    })
}

step1().then(step2).then(finalstep).then((finalMsg) => {
    console.log(finalMsg)
})