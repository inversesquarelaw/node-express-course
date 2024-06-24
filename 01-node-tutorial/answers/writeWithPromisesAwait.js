const { writeFile, readFile } = require("fs").promises;

async function writer() {
  try {
    // Documentation for fs.promises.writeFile:
    // https://nodejs.org/api/fs.html#fspromiseswritefilefile-data-options
    await writeFile("temp.txt", "This is Line 1\n", { flag: "a" });
    await writeFile("temp.txt", "This is Line 2\n", { flag: "a" });
    await writeFile("temp.txt", "This is Line 3\n", { flag: "a" });
  } catch (err) {
    console.error(err);
  }
}

async function reader() {
  try {
    // Documentation for fs.promises.readFile:
    // https://nodejs.org/api/fs.html#fspromisesreadfilepath-options
    const contentsReadFromFile = await readFile("temp.txt", "utf8");
    console.log(contentsReadFromFile);
  } catch (err) {
    console.error(err);
  }
}

// since both writer and reader are async functions, we CAN't call them directly in the main code.
// We need to call them in an async function, like the readWrite function we write below:
async function readWrite() {
  await writer();
  await reader();
}

// we call/invoke the readWrite function here:
readWrite();
