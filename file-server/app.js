const http = require("http");
const fs = require("fs").promises;
const path = require("path");

const getPathFromUrl = (url) => {
  const requestUrl = new URL(url, 'http://localhost:3000/');
  return requestUrl.pathname;
};

const getFileFromPath = async (filePath) => {
  return await fs.readFile(filePath);
};

const getIndexPage = async () => {
  const indexPagePath = path.join(__dirname, "public", "index.html");
  return await getFileFromPath(indexPagePath);
}

const getCss = async (name) => {
  const cssPath = path.join(__dirname, "public", "css", name);
  return await getFileFromPath(cssPath);
}

const createUser = () => {
  const html = `  <div id="users">
    <div>
      <p><span style="font-weight: bold;">First Name</span>$FIRST_NAME</p>
      <p><span style="font-weight: bold;">Last Name</span>$LAST_NAME</p>
    </div>
  </div>`;

  return html.replaceAll('$FIRST_NAME', firstName).replaceAll('$LAST_NAME', lastName);
}

const server = http.createServer(
  async (request, response) => {

    const path = getPathFromUrl(request.url);
    switch (path) {
      case '/':
        const index = await getIndexPage();
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(index.toString());
        response.end();
        break;
      case '/':
        let body = '';
        request.on('data', (chunk) => {
          body += chunk.toString();
        });
        request.on('end', async () => {
          console.log(body);
          const index = await getIndexPage();
          response.writeHead(200, { "Content-Type": "text/html" });
          response.write(index.toString());
          response.end();
        })
        break;

      default:
        response.writeHead(404, {
          'Content-Type': 'text/html'
        });
        response.write("<html><body><h1>Page not found</h1></body></html>");
        response.end();
    }

  }
);

server.listen(3000);