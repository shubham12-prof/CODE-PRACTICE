function unsableApi() {
    return new Promise((resolve, reject) => {
        const sucess = Math.random() > 0.5;
        setTimeout(() => {
            if (sucess) {
                resolve(" sucess on this attempt")
            }
        }, 1000);
    })
}

async function retryApi(maxRetry = 3) {
    for (let attempt = 1; attempt <= maxRetry; attempt++) {
        try {
            const result = await unsableApi();
            console.log(`attempt ${attempt}:`, result)
            return;
        }
        catch (error) {
            console.log(`attempt ${attempt} failed`, error)
            if (error === maxRetry) {
                console.log("all attempts failed")
            }
        }
    }
}
retryApi()