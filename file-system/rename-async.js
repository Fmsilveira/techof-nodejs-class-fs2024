const fs = require("fs");
const path = require("path");

const oldFilePath = path.join(__dirname, "my-file.txt");
const newFilePath = path.join(__dirname, "copiei-async.txt");

// async function rename() {
//   await fs.rename(oldFilePath, newFilePath);
// }

// rename();

fs.rename(oldFilePath, newFilePath, function(err) {
  if (err) {
    console.error(err);
    return;
  }

  console.log('File moved')
})
