const fs = require("fs");
const path = require("path");

const myFilePath = path.join(__dirname, "my-file-123.txt");
const newData = "Mudei o texto\n";

fs.writeFileSync(myFilePath, newData, { encoding: 'utf8', flag: 'a+'});
