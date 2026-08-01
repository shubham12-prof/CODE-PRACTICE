fetch("https://jsonplaceholder.typicode.com/todos")
    .then((res) => res.json())
    .then((data) => {
        console.log(data); // ✅ use data here
    })
    .catch((err) => console.log(err));