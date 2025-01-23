const express = require('express');

const flatService = require('../services/flatService');
const {
  verifyAuthorizationHeaderMiddleware,
  validateAccessTokenMiddleware,
  getUserMiddleware,
  validateUserPermissionMiddleware,
} = require('../middlewares');

const flatRouter = express.Router();

flatRouter.post('', 
  verifyAuthorizationHeaderMiddleware,
  validateAccessTokenMiddleware,
  getUserMiddleware,
  validateUserPermissionMiddleware('user'),
  async (req, res, next) => {
  const {
    title,
    description,
    price,
    address,
    tags,
  } = req.body;

  const flat = await flatService.createFlat({
    title,
    description,
    price,
    address,
    tags,
  });

  res.json(flat);
})

module.exports = flatRouter;