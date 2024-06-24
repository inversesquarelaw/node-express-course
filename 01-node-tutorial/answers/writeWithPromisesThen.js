const {writeFile, readFile} = require("fs").promises;

writeFile("temp.txt", "this is writing line 1 with then chaining\n", { flag: "a" }) // write line 1
  .then(() => {
    return writeFile("temp.txt", "this is writing line 2 using then chaining\n", { flag: "a" }); // write line 2.
    // Return the promise so you can chain the .then statements
  })
  .then(() => {
    return writeFile("temp.txt", "this is writing line 3 using then chaining\n", { flag: "a" });
  }) // write the third line, and follow that with two more .then blocks,
  // one to call readFile to read it back out, and one to log the data to the screen.
  .then(() => {
    return readFile("temp.txt", "utf8"); // read the file
  })
  .then((contentsReadFromFile) => {
    console.log(contentsReadFromFile);
  })
  .catch((error) => {
    console.log("An error occurred: ", error);
  });
