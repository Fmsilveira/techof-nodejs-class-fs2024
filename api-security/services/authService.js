const jwt = require('jsonwebtoken');

const MY_SUPER_SECURE_SECRET = "MY_SUPER_SECURE_SECRET"

const createAccessToken = ({
  userId,
  email,
  permissions
}) => {
  return jwt.sign(
    {
      userId,
      email,
      permissions,
    },
    MY_SUPER_SECURE_SECRET,
    {
      expiresIn: 30 * 60
    }
  );
}

const validateAccessToken = (accessToken) => {
  return jwt.verify(
    accessToken,
    MY_SUPER_SECURE_SECRET
  )
}

module.exports = {
  createAccessToken,
  validateAccessToken,
}
