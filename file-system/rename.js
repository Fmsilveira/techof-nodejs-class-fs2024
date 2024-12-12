const fs = require("fs");
const path = require("path");

const oldFilePath = path.join(__dirname, "my-file.txt");
const newFilePath = path.join(__dirname, "files", "copiei.txt");
fs.renameSync(oldFilePath, newFilePath);
