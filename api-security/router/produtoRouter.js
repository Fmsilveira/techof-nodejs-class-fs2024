const express = require('express');

const ProdutoModel = require('../models/ProdutoModel');
const { getProdutos } = require('../services/produtoService');
const {
  validateRequestBodyMiddleware,
  verifyAuthorizationHeaderMiddleware,
  validateAccessTokenMiddleware,
  getUserMiddleware,
  validateUserPermissionMiddleware,
} = require('../middlewares');

const ADMIN_PERMISSION = 'admin'

const produtosRouter = express.Router();

produtosRouter.get('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {

    res.json({
      success: true,
      produto: produto
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      produto: {}
    })
  }
});

produtosRouter.get('', async (req, res, next) => {
  const {
    limit,
    page,
    sortBy,
    sortOrder,
    ...queryObj
  } = req.query;

  try {
    const produtos = await getProdutos({
      limit,
      page,
      sortBy,
      sortOrder,
      queryObj
    });

    return res.json({
      success: true,
      produtos: produtos
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      produtos: []
    })
  }
});

produtosRouter.post('',
  verifyAuthorizationHeaderMiddleware,
  validateAccessTokenMiddleware,
  getUserMiddleware,
  validateUserPermissionMiddleware(ADMIN_PERMISSION),
  validateRequestBodyMiddleware,
  async (req, res, next) => {
    const { body } = req;
    const {
      title,
      description,
      price,
      age,
      tags,
    } = body;

    try {
      const newProduct = new ProdutoModel({
        title,
        description,
        price,
        age,
        tags,
      });
      await newProduct.save();

      res.json({
        success: true,
        produto: newProduct
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        success: false,
        produto: {}
      })
    }
  });

produtosRouter.post('/bulk', 
  verifyAuthorizationHeaderMiddleware,
  validateAccessTokenMiddleware,
  getUserMiddleware,
  validateUserPermissionMiddleware(ADMIN_PERMISSION),
  async (req, res, next) => {
  const { products } = req.body;

  const productsModels = products.map(product => {
    const {
      title,
      description,
      price,
      age
    } = product;


    return new ProdutoModel({
      title,
      description,
      price,
      age
    });
  });

  try {
    await ProdutoModel.insertMany(productsModels);

    res.json({
      success: true,
      produtos: productsModels
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      produtos: []
    })
  }
});

produtosRouter.patch('/:id',
  verifyAuthorizationHeaderMiddleware,
  validateAccessTokenMiddleware,
  getUserMiddleware,
  validateUserPermissionMiddleware(ADMIN_PERMISSION),
  validateRequestBodyMiddleware,
  async (req, res, next) => {
    const {
      title,
      description,
      price,
      age
    } = req.body;
    const { id } = req.params;

    try {
      const newProduct = {
        title,
        description,
        price,
        age
      };
      // const produto = await ProdutoModel.findByIdAndUpdate(
      //   id,
      //   newProduct,
      //   {
      //     runValidators: true,
      //     returnDocument: 'after',
      //     lean: true,
      //     upsert: false,
      //   }
      // );

      const [produto] = await ProdutoModel.find({
        _id: id
      });
      produto.price = price;
      produto.age = age;

      await produto.save();

      res.json({
        success: true,
        produto,
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        success: false,
        produto: {}
      })
    }
  });

produtosRouter.get('/statistics', 
  verifyAuthorizationHeaderMiddleware,
  validateAccessTokenMiddleware,
  getUserMiddleware,
  validateUserPermissionMiddleware(ADMIN_PERMISSION),
  async (req, res, next) => {
  try {
    const produtos = await ProdutoModel.aggregate([
      {
        $match: {
          age: {
            $gt: 1
          }
        }
      },
      {
        $group: {
          _id: null,
          count: {
            $sum: 1
          },
          averagePrice: {
            $avg: '$price'
          },
          minimumPrice: {
            $min: "$price",
          },
          maximumPrice: {
            $max: '$price'
          }
        }
      }
    ])

    return res.json({
      success: true,
      produtos: produtos
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      produtos: []
    })
  }
});

module.exports = produtosRouter;
