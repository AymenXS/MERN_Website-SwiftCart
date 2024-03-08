const express = require('express');
const router = express.Router();

const {
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} = require('../controllers/productController');

module.exports = router;
