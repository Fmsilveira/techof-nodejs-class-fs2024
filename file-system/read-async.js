const fs = require("fs").promises;
const path = require("path");

async function readFile() {
  try {
    const myFilePath = path.join(__dirname, "my-file.txt");
    const data = await fs.readFile(myFilePath, { encoding: 'utf8' });
    console.log(data);
  } catch (error) {
    console.log('File not found');
  } finally {
    console.log('END');
  }
}
readFile();
