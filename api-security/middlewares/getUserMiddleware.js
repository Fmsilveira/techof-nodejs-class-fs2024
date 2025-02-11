const { getUserById } = require('../services/userService');

const getUserMiddleware = async (req, res, next) => {
  const { userId } = req;

  const user = await getUserById(userId);
  if (!user) {
    console.error('User not found');
    return res.status(403).send({
      success: false,
      error: 'Forbidden'
    })
  }

  req.user = user;
  next();
}

module.exports = {
  getUserMiddleware,
};