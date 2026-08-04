// only in console otherwise undifined
var name = "shubham";
function sayname() {
    console.log(this.name);
}

sayname();


// name print using this

const person = {
    name: "shubham",
    sayHello: function () {
        console.log(`hello my name is ${this.name}`)
    }
}
person.sayHello()