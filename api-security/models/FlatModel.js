const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FlatSchema = new Schema({
  title: String,
  description: String,
  price: {
    type: Number,
    required: true,
    min: [0, 'The price must be above 0'],
    max: [100000, 'The price must be below 100000']
  },
  address: String,
  tags: [String],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Flat', FlatSchema, 'flat');