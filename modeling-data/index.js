const express = require('express');
const FlatModel = require('./models/FlatModel');
const CommentModel = require('./models/CommentModel');

require('dotenv').config();
const { PORT } = process.env;

const {
  createConnectionWithDb,
  closeConnectionWithDb,
} = require('./db');


const app = express();

const configureApi = () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
}

const createFlat = async () => {
  const comment = new CommentModel({
    text: 'Meu comentario',
    userName: 'user name',
    rating: 5,
  });
  await comment.save();

  const flat = new FlatModel({
    title: "Flat 23",
    description: "Meu primeiro flat com reference",
    price: 100,
    address: "rua do reference, 123",
    tags: [
      "epico"
    ],
    comment: [comment],
  });

  await flat.save();
}

const startUp = async () => {
  console.log("Starting service");

  configureApi();
  await createConnectionWithDb();
  await createFlat();

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
