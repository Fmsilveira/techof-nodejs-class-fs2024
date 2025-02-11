const express = require('express');
const FlatModel = require('./models/FlatModel');
const CommentModel = require('./models/CommentModel');
const UserModel = require('./models/UserModel');

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
  const [user] = await UserModel.find({
    email: "test1@domain.com"
  });
  
  const comment = new CommentModel({
    text: 'Meu comentario 1',
    userId: user,
    rating: 5,
  });
  await comment.save();

  const flat = new FlatModel({
    title: "Flat 33",
    description: "Meu primeiro flat com reference e comment",
    price: 100,
    address: "rua do reference, 321",
    tags: [
      "epico"
    ],
    comment: [comment],
  });

  await flat.save();
}

const findComment = async () => {
  const comment = await CommentModel
    .findById('6799471ccea7b386d7dce1ac')
    .populate('userId');

  console.log('comment', comment.toJSON())
}

const findFlat = async () => {
  const flat = await FlatModel.findById('6799471ccea7b386d7dce1ae')
  .populate('comment');

  console.log('flat', flat.toJSON())
}

const startUp = async () => {
  console.log("Starting service");

  configureApi();
  await createConnectionWithDb();
  await findFlat();

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
