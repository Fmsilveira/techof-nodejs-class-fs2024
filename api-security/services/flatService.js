const FlatModel = require('../models/FlatModel');

const createFlat = async ({
  title,
  description,
  price,
  address,
  tags,
  user,
}) => {
  return await new FlatModel({
    title,
    description,
    price,
    address,
    tags,
    user,
  }).save();
}

const getFlatById = async (flatId) => {
  return FlatModel.findById(flatId).populate('user');
}

const updateFlat = async (doc, newData) => {
  doc.title = newData.title;
  doc.description = newData.description;
  doc.price = newData.price;
  doc.address = newData.address;
  doc.tags = newData.tags;
  doc.user = newData.user;

  return await doc.save();

}

module.exports = {
  createFlat,
  getFlatById,
  updateFlat,
}
