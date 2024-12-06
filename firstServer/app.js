const http = require("http");
const { URLSearchParams } = require("url");

const server = http.createServer(
  function (request, response) {
    const requestUrl = new URL(request.url, 'http://localhost:3000/');
    const { searchParams } = requestUrl;
    const path = requestUrl.pathname;

    switch (path) {
      case '/':
        response.write('Ola');
        break;
      case '/techof':
        response.write('TechOf');
        break;
      case '/search':

        response.write(searchParams.toString());
        break;
      case '/users':
        const USERS = [
          {
            firstName: 'Bruno',
            lastName: 'Hirata'
          },
          {
            firstName: 'Bruno',
            lastName: 'Laje'
          },
          {
            firstName: 'Filipe',
            lastName: 'Silveira'
          }
        ]
        let firstName = searchParams.get("first-name");
        let lastName = searchParams.get("last-name");

        response.writeHead(200, {
          'content-type': 'application/json'
        })
        response.write(JSON.stringify(
          USERS.filter(
            (user) => !firstName || (firstName.toLowerCase() === user.firstName.toLowerCase())
          ).filter(
            (user) => !lastName || (lastName.toLowerCase() === user.lastName.toLowerCase())
          )
        ));
        break;
      default:
        response.writeHead(404, {
          'Content-Type': 'text/html'
        });
        response.write("<html><body><h1>Page not found</h1></body></html>");
    }

    response.end();

  }
)

server.listen(3000);

