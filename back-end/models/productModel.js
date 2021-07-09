const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  const allProducts = await connection()
  .then((db) => db.collection('products').find().toArray());
  return allProducts;
}

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const idProduct = await connection()
    .then((db) => db.collection('products').findOne(ObjectId(id)));
  return idProduct;
}

const increasePrice = async (id) => {
  const product = await connection()
    .then((db) => db.collection('products').findOneAndUpdate({ _id: ObjectId(id) }, { $inc: { price: 5 } },{ returnNewDocument: true }));
  return product;
}

const updateSold = async (id) => {
  const product = await connection()
    .then((db) => db.collection('products').findOneAndUpdate({ _id: ObjectId(id) }, { $set: { sold: true } },{ returnNewDocument: true }));
  return product;
}

module.exports = {
  getAll,
  getById,
  increasePrice,
  updateSold,
}
