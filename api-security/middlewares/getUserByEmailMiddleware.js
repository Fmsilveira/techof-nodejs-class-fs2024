const { getUsers } = require('../services/userService');

const getUserByEmailMiddleware = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: 'Bad Request'
    })
  }

  const [user] = await getUsers({
    email
  });

  req.user = user;
  next();
}

module.exports = {
  getUserByEmailMiddleware
}
