const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

const createProduct = async (req, res) => {
  req.body.user = req.user.userID;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

const getAllProducts = async (req, res) => {
  res.status(StatusCodes.OK).send('Get All Products');
};

const getSingleProduct = async (req, res) => {
  res.status(StatusCodes.OK).send('Get Single Product');
};

const updateProduct = async (req, res) => {
  res.status(StatusCodes.OK).send('Update Product');
};

const deleteProduct = async (req, res) => {
  res.status(StatusCodes.OK).send('Delete Product');
};

const uploadImage = async (req, res) => {
  res.status(StatusCodes.OK).send('Upload Image');
};

module.exports = {
  getAllProducts,
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
