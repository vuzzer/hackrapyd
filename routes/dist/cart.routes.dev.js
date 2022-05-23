"use strict";

var express = require('express');

var cartController = require('../controllers/cart.controller');

var router = express.Router();
router.get('/', cartController.getCart); // /cart/

router.post('/items', cartController.addCartItem); // /cart/items

router.post('/items/del', cartController.removeCartItem);
router.patch('/items', cartController.updateCartItem);
module.exports = router;