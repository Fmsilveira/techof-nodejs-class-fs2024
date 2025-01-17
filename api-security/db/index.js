const mongoose = require('mongoose');

const { CONNECTION_STRING } = process.env;

const createConnectionWithDb = async () => {
  console.log('Connecting to DB');
  await mongoose.connect(CONNECTION_STRING);
  console.log('Conneted to DB');
}

const closeConnectionWithDb = async () => {
  console.log('Disconnecting from DB');
  await mongoose.connection.close();
  console.log('Disconnected from DB');
}

module.exports = {
  createConnectionWithDb,
  closeConnectionWithDb,
}
