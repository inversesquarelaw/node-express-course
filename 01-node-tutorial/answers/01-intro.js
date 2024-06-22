console.log("hello! node-express-week1");

let num = Math.round(Math.random() * 100);

if (num < 50) {
  console.log(`${num} is less than 50`);
} else if (num > 50) {
  console.log(`${num} is more than 50`);
} else {
  console.log(`number is 50`);
}
