const FlatModel = require('../models/FlatModel');

const createFlat = async ({
  title,
  description,
  price,
  address,
  tags,
}) => {
  return await new FlatModel({
    title,
    description,
    price,
    address,
    tags,
  }).save();
}

module.exports = {
  createFlat,
}
