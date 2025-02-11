require('dotenv').config();
const express = require('express');

const { createConnectionWithDb, closeConnectionWithDb, getDBConnection } = require('./config/db');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

const configureApi = () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
}

const startUp = async () => {
  console.log("Starting service");

  configureApi();
  await createConnectionWithDb();

  app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  })
}

const shutdown = async () => {
  await closeConnectionWithDb();

  process.exit(0);
}

process.on('SIGINT', shutdown);

app.get('/person/:id?', async (req, res, next) => {
  const { id: personId } = req.params;
  const db = await getDBConnection();

  try {
    const query = personId ? 'select first_name, last_name from TB_PERSON p left join TB_ADDRESS a on p.address_id = a.id where `p`.`id` = ? ' 
    : 'select * from TB_PERSON p left join TB_ADDRESS a on p.address_id = a.id';
    const [result] = await db.query(
      query,
      [personId]
    ) 
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
  const db = await getDBConnection();

  try {
    const query = 'INSERT INTO `techof-sql-class`.`TB_PERSON` (first_name,last_name,salary,birthday, address_id) VALUES (?, ?, ?, ?, ?)';
    const [result] = await db.query(
      query,
      [person.first_name, person.last_name, person.salary, person.birthday, person.address_id]
    ) 
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

startUp().catch(async (error) => {
  console.error('Start Up error')
  console.error(error);
  shutdown();
});
