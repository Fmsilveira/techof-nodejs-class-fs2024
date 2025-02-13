const express = require('express');

const knex = require('./config/db');

const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const Person = {
  dbProperties: {
    firstName: 'first_name',
    lastName: 'last_name',
  },
  tbName: 'TB_PERSON'
}


app.get('/person/:id?', async (req, res, next) => {
  const { id: personId } = req.params;
  const firstName = req.query['first-name'];

  try {
    const query = knex
      .column(
        Person.dbProperties.firstName,
        Person.dbProperties.lastName
      )
      .select().from(Person.tbName);

    if (personId) {
      query.where('id', personId);
    }
    if (firstName) {
      query.where(
        Person.dbProperties.firstName, 'LIKE', `%${firstName}%`
      )
    }

    const result = await query;
    console.log('result', result);

    res.json({
      success: true,
      persons: result
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error
    })
  }
});

app.post('/person', async (req, res, next) => {
  const { body: person } = req;
  console.log(person, req.body)

  try {
    const newPerson = {
      first_name: person.first_name,
      last_name: person.last_name,
      salary: person.salary,
      birthday: person.birthday,
      address_id: person.address_id
    };

    const result = await knex(Person.tbName).insert(newPerson);

    console.log('result', result);

    res.json({
      success: true,
      person: result
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error
    })
  }
});


const startUp = async () => {
  console.log('Starting service')
  app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  })
}

const shutdown = async () => {
  process.exit(0);
}

startUp().catch(async (error) => {
  console.error('Start Up error')
  console.error(error);
  shutdown();
});
