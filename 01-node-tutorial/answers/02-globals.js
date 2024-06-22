// GLOBALS  - NO WINDOW object in Node Javascript, unlike in the browser Javascript!!!

// __dirname  - path to current directory
// __filename - file name
// require    - function to use modules (CommonJS)
// module     - info about current module (file)
// process    - info about env where the program is being executed

console.log("the current directory is: ", __dirname);
console.log("the current file is: ", __filename);
console.log("the exported variable is: ", process.env.MY_VAR);

console.log("=================================================");
console.log("the current module is: ", module);
console.log("the current process is: ", process);

/*
setInterval(() => {
  console.log("hello world");
}, 1000);
*/
