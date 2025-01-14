const express = require('express');

const app = express();
app.use(express.json())

const USERS = [
  {
    firstName: 'Bruno',
    lastName: 'Hirata'
  },
  {
    firstName: 'Bruno',
    lastName: 'Souza'
  },
  {
    firstName: 'Jane',
    lastName: 'Doe'
  },
  {
    firstName: 'John',
    lastName: 'Smith'
  }
];

app.get('/:firstName/:lastName?', (req, res) => {
  const { firstName, lastName } = req.params;
  console.log('req.params', req.params);

  res.send(USERS.filter(user => {
    return user.firstName.toLowerCase() === firstName.toLowerCase()
      &&  (!lastName || lastName === '' || user.lastName.toLowerCase() === lastName?.toLowerCase())
  }));
});

app.get('/', (request, response) => {
  response.status(200).send({
    users: USERS,
  });
});

app.post('/', (request, response) => {
  const { body: { firstName, lastName } } = request;
  const user = {
    firstName,
    lastName
  };

  USERS.push(user);

  response.status(200).send({
    users: USERS,
  });
});

app.listen(3000, () => {
  console.log('Server is listening on ', 3000);
});
