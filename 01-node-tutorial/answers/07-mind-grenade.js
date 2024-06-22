const num1 = 15;
const num2 = 20;

function addValues() {
  console.log(`the sum is : ${num1 + num2}`);
}

// the mind grenade is that the function below is invoke in file 07-mind-grenade.js
// and not in the main file 03-modules.js, but when we require file 07-mind-grenade.js
// in 03-modules.js, the function addValues() is also invoked implicitly.
addValues();
