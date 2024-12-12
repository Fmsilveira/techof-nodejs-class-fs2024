const fs = require("fs").promises;
const path = require("path");

async function writeFile() {
  const myFilePath = path.join(__dirname, "my-file-write-async.txt");
  const newData = "Mudei o texto\n";
  
  await fs.writeFile(myFilePath, newData, { encoding: 'utf8', flag: 'a+'})
}
writeFile();