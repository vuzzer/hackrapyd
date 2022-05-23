"use strict";

var express = require('express');

var ordersController = require('../controllers/orders.controller');

var router = express.Router();
router.post('/', ordersController.addOrder); // /orders

router.get('/buy', ordersController.buy); // /orders/buy

router.get('/', ordersController.getOrders); // /orders

module.exports = router;