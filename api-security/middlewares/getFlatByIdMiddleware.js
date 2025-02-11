const { getFlatById } = require('../services/flatService');

const getFlatByIdMiddleware = async (req, res, next) => {
  const { flatId } = req.params;

  const flat = await getFlatById(flatId);
  if (!flat) {
    console.error('Flat not found', req);
    return res.status(403).send({
      success: false,
      error: 'Forbidden'
    })
  }

  req.flat = flat;
  next();
}

module.exports = {
  getFlatByIdMiddleware,
};