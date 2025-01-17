const ProdutoModel = require('../models/ProdutoModel');

const getProdutos = async ({
  limit,
  page,
  sortBy,
  sortOrder,
  queryObj
}) => {
  Object.keys(queryObj).forEach(key => {
    queryObj[key] = JSON.parse(queryObj[key])
  })

  const produtos = await ProdutoModel.find(
    queryObj,
    {
    },
    {
      limit,
      skip: Number(page) * Number(limit),
    }
  );

  return produtos;
}

module.exports = {
  getProdutos
}
