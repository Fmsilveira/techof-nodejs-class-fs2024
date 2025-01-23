const express = require('express');

require('dotenv').config();
const { PORT } = process.env;

const {
  createConnectionWithDb,
  closeConnectionWithDb,
} = require('./db');

const userRouter = require('./router/userRouter');
const produtoRouter = require('./router/produtoRouter');
const flatRouter = require('./router/flatRouter');

const app = express();

const configureApi = () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use('/user', userRouter);
  app.use('/product', produtoRouter);
  app.use('/flat', flatRouter);
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

startUp().catch((error) => {
  console.error('Start Up error')
  console.error(error);
})
