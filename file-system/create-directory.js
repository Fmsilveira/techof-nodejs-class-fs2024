const fs = require("fs");
const path = require("path");

const NEW_DIRECTORY_NAME = new Date().getDate();
const FILE_NAME = "hoje.txt";

const date = new Date('2024-12-09');
const fileContent = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
const filePath = path.join(__dirname, "logs", `${fileContent}.txt`);

if (!fs.existsSync(fileContent)) {
  fs.mkdirSync(fileContent);
}

fs.writeFileSync(filePath, fileContent, {
  encoding: 'utf-8',
  flag: 'w+'
});

