const mongoose = require('mongoose');

const ProdutoModel = require('./ProdutoModel');

const connectionString = "mongodb+srv://my-new-user:GAWTJzwatdDzC3mZ@techof.0l1vepo.mongodb.net/tech-of-mongodb-class-04-2024?retryWrites=true&w=majority&appName=TechOf";

async function insert() {
  try {
    const connection = await mongoose.connect(connectionString);

    const redBall = new ProdutoModel({
      title: 'Bad Red Ball',
      description: 'Bad big red ball',
      tags: ['circle', 'red', 'ball', 'toy'],
      age: 1,
    });

    await redBall.save();
    console.log(redBall)
  } finally {
    await mongoose.connection.close();
  }
}

async function find() {
  try {
    const connection = await mongoose.connect(connectionString);

    const produtos = await ProdutoModel.find({
      price: {
        '$lt': 0
      }
    });

    console.log(produtos)
  } finally {
    await mongoose.connection.close();
  }
}

async function update() {
  try {
    const connection = await mongoose.connect(connectionString);

    const produtos = await ProdutoModel.findByIdAndUpdate(
      '678170b86ab97d89d741c96e',
      {
        price: 5
      },
      {
        runValidators: true,
        returnDocument: 'after',
      }
    );

    console.log(produtos)
  } finally {
    await mongoose.connection.close();
  }
}

update().catch(console.log)
