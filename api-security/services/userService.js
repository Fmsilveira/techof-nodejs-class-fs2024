const bcrypt = require('bcrypt');
const UserModel = require("../models/UserModel");

const signUp = async ({
  email,
  password,
  firstName,
  lastName,
  photo,
}) => {
  const salt = bcrypt.genSaltSync(12);
  const encryptedPassword = bcrypt.hashSync(password, salt);

  const newUser = new UserModel({
    email,
    password: encryptedPassword,
    firstName,
    lastName,
    photo,
    isActive: true,
    created: new Date(),
    modified: new Date(),
  });

  return await newUser.save();
}

const login = async ({
  email,
  password
}) => {
  const user = await UserModel.findOne({
    email
  });

  console.log('login', user)
  if (!user) {
    throw new Error('user not found');
  }

  const result = bcrypt.compareSync(password, user.password);
  console.log('login result', result);
  if (!result) {
    throw new Error('failed to authenticate');
  }

  return user;
}

module.exports = {
  signUp,
  login,
}
