const fs = require("fs");
const path = require("path");

try {
  const myFilePath = path.join(__dirname, "my-file.txt");
  const data = fs.readFileSync(myFilePath, { encoding: 'utf-8'});
  console.log(data);
} catch (error) {
  console.log(error);
}
