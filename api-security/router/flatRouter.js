const express = require('express');

const flatService = require('../services/flatService');
const {
  verifyAuthorizationHeaderMiddleware,
  validateAccessTokenMiddleware,
  getUserMiddleware,
  validateUserPermissionMiddleware,
  getFlatByIdMiddleware,
} = require('../middlewares');

const flatRouter = express.Router();

// 1 - Adicionar no flat quem foi o usuario que criou
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
    const { user } = req;

    const flat = await flatService.createFlat({
      title,
      description,
      price,
      address,
      tags,
      user,
    });

    res.json(flat);
  });

// 2 - Criar um endpoint para alterar o flat. Somente o usuario que criou o flat que pode altera-lo
flatRouter.put('/:flatId',
  verifyAuthorizationHeaderMiddleware,
  validateAccessTokenMiddleware,
  getUserMiddleware,
  validateUserPermissionMiddleware('user'),
  getFlatByIdMiddleware,
  async (req, res, next) => {
    // Comparar se o user que esta logado tem permissao para editar o flat
    // Comparando o user._id com o flat.user._id
    const { flat, user } = req;
    
    const isFlatOwnedByUser = flat.user._id.toString() === user._id.toString();
    if (!isFlatOwnedByUser) {
      console.error('Flat not owned by user', 'flat _id', flat._id.toString(), 'user _id', user._id.toString(), user, flat)
      return res.status(403).send({
        success: false,
        error: 'Forbidden'
      })
    }

    next();
  },
  async (req, res, next) => {
    // Faz a alteração
    const { flat, body } = req;

    const result = await flatService.updateFlat(flat, body);
    res.json(result); 
  }
)

module.exports = flatRouter;