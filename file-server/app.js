const http = require("http");
const fs = require("fs").promises;
const path = require("path");

const USERS = [];

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
  const cssPath = path.join(__dirname, "public", ...name.split("/"));
  return await getFileFromPath(cssPath);
}

const createUser = (firstName, lastName) => {
  const html = `  <div class="user">
      <p><span style="font-weight: bold;">First Name: </span>$FIRST_NAME</p>
      <p><span style="font-weight: bold;">Last Name: </span>$LAST_NAME</p>
  </div>`;

  return html.replaceAll('$FIRST_NAME', firstName).replaceAll('$LAST_NAME', lastName);
}

const classifyPath = (url) => {
  if (url.match(/css$/)) {
    return 'CSS';
  }

  return 'HTML';
}

const server = http.createServer(
  async (request, response) => {

    const path = getPathFromUrl(request.url);
    const pathType = classifyPath(request.url);
    switch (pathType) {
      case 'HTML':
        const { method } = request;

        if ('GET' === method) {
          const index = await getIndexPage();

          const usersHtml = USERS.map(user => createUser(user.firstName, user.lastName));

          response.writeHead(200, { "Content-Type": "text/html" });
          response.write(index.toString().replaceAll('{%USERS%}', usersHtml.join('\n')));

          response.end();
        } else {
          let body = '';
          request.on('data', (chunk) => {
            body += chunk.toString();
          });
          request.on('end', async () => {
            console.log(body);
            const data = {};
            body.split('&').map(param => param.split('=')).forEach(([key, value]) => data[key] = value);
            USERS.push({
              firstName: data['first-name'],
              lastName: data['last-name']
            });

            const usersHtml = USERS.map(user => createUser(user.firstName, user.lastName));

            const index = await getIndexPage();
            response.writeHead(200, { "Content-Type": "text/html" });
            response.write(index.toString().replaceAll('{%USERS%}', usersHtml.join('\n')));
            response.end();
          })
          break;

        }
        break;
      case 'CSS':
        const css = await getCss(path);
        response.writeHead(200, { "Content-Type": "text/css" })
        response.write(css.toString());
        response.end();
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