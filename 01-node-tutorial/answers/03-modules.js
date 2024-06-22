const { lawrence } = require("./04-names"); // import module using require as destructuring
const names = require("./04-names"); // import module using require as an object
const sayHi = require("./05-utils");
const data = require("./06-alternative-flavor");

console.log("printing the names object from 04-names.js");
console.log(names);
console.log("==========");

console.log("data: ", data);
console.log("==========");

console.log("this is the MY_VAR env var: ", process.env.MY_VAR);
console.log("==========");

sayHi("susan");
sayHi(lawrence); //using destructuring
sayHi(names.john); //using object by referencing names.john
console.log("==========");

console.log(
  "we import/require file 07 and it will invoke the function addValues() implicitly"
);
require("./07-mind-grenade");
