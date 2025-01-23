const verifyAuthorizationHeaderMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || '' === authorization) {
    return res.status(401).send({
      success: false,
      error: 'Unauthorized'
    })
  }

  req.authorization = authorization
  next()
}

module.exports = {
  verifyAuthorizationHeaderMiddleware
}