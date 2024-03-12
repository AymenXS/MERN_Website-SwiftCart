const Review = require('../models/Review');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const path = require('path');

const createReview = async (req, res) => {
  res.status(StatusCodes.CREATED).json('create review');
};

const getAllReviews = async (req, res) => {
  const products = await Review.find({});

  res.status(StatusCodes.OK).json({ products, count: products.length });
};

const getSingleReview = async (req, res) => {
  const { id: productID } = req.params;

  const product = await Review.findOne({ _id: productID });

  if (!product) {
    throw new CustomError.NotFoundError(`No product with id: ${productID}`);
  }

  res.status(StatusCodes.OK).json({ product });
};

const updateReview = async (req, res) => {
  const { id: productID } = req.params;

  const product = await Review.findOneAndUpdate({ _id: productID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw new CustomError.NotFoundError(`No product with id: ${productID}`);
  }

  res.status(StatusCodes.OK).json({ product });
};

const deleteReview = async (req, res) => {
  const { id: productID } = req.params;

  const product = await Review.findOne({ _id: productID });

  if (!product) {
    throw new CustomError.NotFoundError(`No product with id: ${productID}`);
  }

  await product.remove();
  res.status(StatusCodes.OK).json({ msg: 'Success! Review removed.' });
};

module.exports = {
  getAllReviews,
  createReview,
  getSingleReview,
  updateReview,
  deleteReview,
};
