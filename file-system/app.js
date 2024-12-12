const http = require("http");
const fs = require("fs").promises;
const path = require("path");

const PORT = 3000;

const server = http.createServer(
  async function (request, response) {
    const requestUrl = new URL(request.url, 'http://localhost:3000/');
    const { searchParams } = requestUrl;
    // const path = requestUrl.pathname;

    try {
      const myFilePath = path.join(__dirname, "my-file.txt");
      const data = await fs.readFile(myFilePath, { encoding: 'utf8' });
      response.writeHead(200);
      response.write(data);
    } catch (error) {
      console.log(error);
      response.writeHead(404);
      response.write('File not found');
    } finally {
      response.end();
    }
  }
)

server.listen(PORT);
