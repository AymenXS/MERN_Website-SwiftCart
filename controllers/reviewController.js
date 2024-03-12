const Review = require('../models/Review');
const Product = require('../models/Product');

const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { checkPermissions } = require('../utils');

const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const path = require('path');

const createReview = async (req, res) => {
  const { product: productID } = req.body;

  const isValidProduct = await Product.findOne({ _id: productID });
  if (!isValidProduct) {
    throw new CustomError.NotFoundError(`No product with id: ${productID}`);
  }

  const alreadySubmitted = await Review.findOne({
    product: productID,
    user: req.user.userID,
  });
  if (alreadySubmitted) {
    throw new CustomError.BadRequestError('Already Submitted');
  }

  req.body.user = req.user.userID;
  const review = await Review.create(req.body);

  res.status(StatusCodes.CREATED).send('create review');
};

const getAllReviews = async (req, res) => {
  const reviews = await Review.find({});
  res.status(StatusCodes.OK).send('create review');
};

const getSingleReview = async (req, res) => {
  res.status(StatusCodes.OK).send('get single review');
};

const updateReview = async (req, res) => {
  res.status(StatusCodes.OK).send('review updated');
};

const deleteReview = async (req, res) => {
  res.status(StatusCodes.OK).send('review deleted');
};

module.exports = {
  getAllReviews,
  createReview,
  getSingleReview,
  updateReview,
  deleteReview,
};
