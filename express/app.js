const express = require('express');
const fs = require("fs").promises;
const path = require("path");
const bodyParser = require("body-parser");

const PORT = 3000;
const HOST_NAME = 'localhost';
const USERS = [{
  firstName: 'First',
  lastName: 'Last'
}];

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const myMiddleware = (request, response, next) => {
  const now = new Date();
  console.log(`${now.toISOString()}: Request recebido ${JSON.stringify(request.body)}`);
  next();
}
app.use(myMiddleware);

const getFileFromPath = async (filePath) => {
  return await fs.readFile(filePath);
};

const getIndexPage = async () => {
  const indexPagePath = path.join(__dirname, "public", "index.html");
  return await getFileFromPath(indexPagePath);
}

const createUser = (firstName, lastName) => {
  const html = `  <div class="user">
      <p><span style="font-weight: bold;">First Name: </span>$FIRST_NAME</p>
      <p><span style="font-weight: bold;">Last Name: </span>$LAST_NAME</p>
  </div>`;

  return html.replaceAll('$FIRST_NAME', firstName).replaceAll('$LAST_NAME', lastName);
}

app.get('/', async (request, response) => {
  const index = await getIndexPage();

  const usersHtml = USERS.map(user => createUser(user.firstName, user.lastName));

  response.send(index.toString().replaceAll('{%USERS%}', usersHtml.join('\n')));
});

app.get('/api', (request, response) => {
  response.json({
    users: USERS
  });
});

app.post('/', async (req, res, next) => {
  const { body } = req;
  const user = {
    firstName: body['first-name'],
    lastName: body['last-name']
  };
  USERS.push(user);

  const { headers } = req;
  if (headers.accept === 'application/json') {
    return res.send({
      users: USERS
    })
  }

  const index = await getIndexPage();

  const usersHtml = USERS.map(user => createUser(user.firstName, user.lastName));

  res.send(index.toString().replaceAll('{%USERS%}', usersHtml.join('\n')));
});

app.listen(PORT, HOST_NAME, () => {
  console.log(`App listening http://${HOST_NAME}:${PORT}`);
});
