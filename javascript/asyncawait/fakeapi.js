const api = "https://jsonplaceholder.typicode.com/todos";

function fakeApi() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("api");
        }, 3000);
    });
}

fakeApi()
    .then((data) => {
        console.log(data); // ✅ "api"
    });