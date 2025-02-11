const { verifyAuthorizationHeaderMiddleware } = require('./verifyAuthorizationHeaderMiddleware');
const { validateAccessTokenMiddleware } = require('./validateAccessTokenMiddleware');
const { getUserMiddleware } = require('./getUserMiddleware');
const { validateUserPermissionMiddleware} = require('./validateUserPermissionMiddleware');
const { validateRequestBodyMiddleware } = require('./validateRequestBodyMiddleware');
const { getUserByEmailMiddleware } = require('./getUserByEmailMiddleware');
const { getFlatByIdMiddleware } = require('./getFlatByIdMiddleware');

module.exports = {
  verifyAuthorizationHeaderMiddleware,
  validateAccessTokenMiddleware,
  getUserMiddleware,
  validateUserPermissionMiddleware,
  validateRequestBodyMiddleware,
  getUserByEmailMiddleware,
  getFlatByIdMiddleware,
}