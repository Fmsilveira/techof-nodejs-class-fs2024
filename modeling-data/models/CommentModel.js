const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  text: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  rating: Number
});

module.exports = mongoose.model('Comment', CommentSchema, 'comment');