const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes');

const createProduct = async (req, res) => {
  res.status(StatusCodes.OK).send('Create Product');
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
