const { validateAccessToken } = require('../services/authService');

const validateAccessTokenMiddleware = (req, res, next) => {
  const { authorization } = req;

  const [_, accessToken] = authorization.split('Bearer ')

  req.accessToken = accessToken;

  try {
    const payload = validateAccessToken(accessToken);
    console.log('payload', payload)

    req.userId = payload.userId;
    req.email = payload.email;
    req.permissions = payload.permissions;

    next();
  } catch (error) {
    console.error(error)
    return res.status(401).send({
      success: false,
      error: 'Unauthorized'
    })
  }
}

module.exports = {
  validateAccessTokenMiddleware
}