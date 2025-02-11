require('dotenv').config();
const mysql = require('mysql2/promise');

const {
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PWD,
  MYSQL_DB_NAME,
} = process.env;

let databaseConnection;

const createConnectionWithDb = async () => {
  console.log('Connecting to the database');

  try {
    databaseConnection = await mysql.createConnection({
      host: MYSQL_HOST,
      user: MYSQL_USER,
      password: MYSQL_PWD,
      database: MYSQL_DB_NAME,
    });

    const [result, fields] = await databaseConnection.query(
      `select 1 from DUAL`
    );
    console.log(result);
    console.log(fields);

    console.log('Connected to database');
  } catch (error) {
    console.error('Failed to connect to database');
    console.error(error);
    throw error;
  }
}

const closeConnectionWithDb = async () => {
  console.log('Closing connection with database');
  if (databaseConnection) {
    await databaseConnection.destroy();
  };
  console.log('Closed connection with database');
  return;
}

const getDBConnection = async () => {
  if (!databaseConnection) {
    await createConnectionWithDb();
  }

  return databaseConnection;
}

module.exports = {
  createConnectionWithDb,
  closeConnectionWithDb,
  getDBConnection,
}
