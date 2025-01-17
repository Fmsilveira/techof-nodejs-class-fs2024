const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Please provide email'],
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6
  },
  firstName: String,
  lastName: String,
  photo: String,
  created: Date,
  modified: Date,
  isActive: Boolean,
  permission: {}
});

// A encriptação da senha esta sendo feita no userService
// UserSchema.pre('save', function() {
//   if (!this.isModified('password')) {
//     return;
//   }

//   const salt = bcrypt.genSaltSync(12);
//   this.password = bcrypt.hashSync(this.password, salt);
// })

module.exports = mongoose.model('User', UserSchema, 'user');
