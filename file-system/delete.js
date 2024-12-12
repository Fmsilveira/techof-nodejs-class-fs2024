const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "my-file-123.txt");
fs.unlinkSync(filePath);
