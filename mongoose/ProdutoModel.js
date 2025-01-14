const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProdutoSchema = new Schema({
  title: String,
  description: String,
  price: {
    type: Number,
    required: true,
    min: [0, 'The price must be above 0'],
    max: [100000, 'The price must be below 100000']
  },
  age: Number,
  tags: [String]
});

module.exports = mongoose.model('Produto', ProdutoSchema, 'produto');
