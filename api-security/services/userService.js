const bcrypt = require('bcrypt');
const UserModel = require("../models/UserModel");
const { createAccessToken } = require('./authService');

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
    permissions: [
      'user'
    ]
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

  console.log('login user', user)
  if (!user) {
    throw new Error('user not found');
  }

  const result = bcrypt.compareSync(password, user.password);
  console.log('login result', result);
  if (!result) {
    throw new Error('failed to authenticate');
  }

  delete user.password;
  delete user.__v;

  const accessToken = createAccessToken({
    userId: user._id,
    email,
    ...user
  });
  return {
    user,
    accessToken,
  };
}

const getUsers = async () => {
  const users = await UserModel.find();

  return users;
}

const getUserById = async (userId) => {
  const user = await UserModel.findById(userId);

  return user;
}

module.exports = {
  signUp,
  login,
  getUsers,
  getUserById,
}
