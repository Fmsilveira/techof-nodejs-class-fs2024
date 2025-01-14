const express = require('express');
const mongoose = require('mongoose');

const ProdutoModel = require('./ProdutoModel');

const connectionString = "mongodb+srv://my-new-user:GAWTJzwatdDzC3mZ@techof.0l1vepo.mongodb.net/tech-of-mongodb-class-04-2024?retryWrites=true&w=majority&appName=TechOf";

const app = express();
app.use(express.json());

app.post('/produtos', async (req, res, next) => {
  const { body } = req;
  const {
    title,
    description,
    price,
    age
  } = body;

  try {
    await mongoose.connect(connectionString);
    
    const newProduct = new ProdutoModel({
      title,
      description,
      price,
      age
    });
    await newProduct.save();

    res.json({
      success: true,
      produto: newProduct
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      produto: {}
    })
  } finally {
    await mongoose.connection.close();
  }
});

app.get('/produtos', async (req, res, next) => {
  try {
    await mongoose.connect(connectionString);
    const produtos = await ProdutoModel.find();

    res.json({
      success: true,
      produtos: produtos
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      produtos: []
    })
  } finally {
    await mongoose.connection.close();
  }
});

app.listen(3000, () => {
  console.log('Server listening 3000')
})
