const { lawrence } = require("./04-names"); // import module using require as destructuring
const names = require("./04-names"); // import module using require as an object
const sayHi = require("./05-utils");

console.log("printing the names object from 04-names.js");
console.log(names);

console.log("this is the MY_VAR env var: ", process.env.MY_VAR);

sayHi("susan");
sayHi(lawrence); //using destructuring
sayHi(names.john); //using object by referencing names.john
