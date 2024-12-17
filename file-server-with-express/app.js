const express = require('express');
const fs = require("fs").promises;
const path = require("path");
const bodyParser = require("body-parser");

const PORT = 3000;
const USERS = [];

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

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

  const usersHtml = USERS.map(
    user => createUser(user.firstName, user.lastName)
  );

  return response.status(200).header({ "Content-Type": "text/html" })
    .send(index.toString().replaceAll('{%USERS%}', usersHtml.join('\n')));
});

app.post('/', async (request, response) => {
  const { body } = request;
  USERS.push({
    firstName: body['first-name'],
    lastName: body['last-name'],
  })

  const index = await getIndexPage();

  const usersHtml = USERS.map(
    user => createUser(user.firstName, user.lastName)
  );

  return response.status(200).header({ "Content-Type": "text/html" })
    .send(index.toString().replaceAll('{%USERS%}', usersHtml.join('\n')));

});

app.listen(PORT, () => {
  console.log(`Server listening ${PORT}`);
});