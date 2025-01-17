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

ProdutoSchema.pre('save', function (next) {
  console.log('Pre Save', this.isModified('age'));

  next();
});

ProdutoSchema.pre('find', function () {
  // this.find({ price: { $gt: 50 } })
})

ProdutoSchema.post('validate', function () {
  console.log('Post Validate')
})

ProdutoSchema.post('save', function (doc, next) {
  console.log('Post Save', doc);
  next();
});

module.exports = mongoose.model('Produto', ProdutoSchema, 'produto');
