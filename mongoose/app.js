const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();
const CONNECTION_STRING = process.env.CONNECTION_STRING;

const produtoRouter = require('./routes/produtoRouter');

const app = express();
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000'],
}));
app.use('/produtos', produtoRouter);

mongoose.connect(CONNECTION_STRING)
  .then(() => {
    app.listen(3001, () => {
      console.log('Server listening 3001')
    })
  });

process.on('SIGINT', async function() {
  console.log('Closing Mongoose Connection');
  await mongoose.connection.close();
  console.log('Connection Closed');
  process.exit();
});
