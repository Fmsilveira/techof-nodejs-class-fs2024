require('dotenv').config();

const {
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PWD,
  MYSQL_DB_NAME,
} = process.env;

const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PWD,
    database: MYSQL_DB_NAME,
  }
});

module.exports = knex;
