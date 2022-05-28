"use strict";

var express = require('express');

var productsController = require('../controllers/products.controller');

var router = express.Router();
router.get('/products', productsController.getAllProducts);
router.post('/products/search', productsController.searchProducts);
router.get('/products/:id', productsController.getProductDetails);
module.exports = router;