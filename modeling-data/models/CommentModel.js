const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  text: String,
  userName: String,
  rating: Number
});

module.exports = mongoose.model('Comment', CommentSchema, 'comment');