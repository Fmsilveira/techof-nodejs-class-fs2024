const { somar } = require("./somar");
const { subtrair } = require("./subtrair");

console.log("Hello World");

const x = 10;
const y = 90;

console.log('somar', somar(x, y));
console.log('subtrair', subtrair(x, y));

let i = 0;
let numbers = [];
while (i < 10) {
  numbers.push(i);
  i++;
}

numbers.forEach(console.log)

