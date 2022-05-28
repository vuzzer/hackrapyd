"use strict";

var Product = require('../models/product.model');

function getAllProducts(req, res, next) {
  var products;
  return regeneratorRuntime.async(function getAllProducts$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Product.findAll());

        case 3:
          products = _context.sent;
          res.render('customer/products/all-products', {
            products: products,
            id: null
          });
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          next(_context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}

function getProductDetails(req, res, next) {
  var products;
  return regeneratorRuntime.async(function getProductDetails$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Product.findAll());

        case 3:
          products = _context2.sent;
          res.render('customer/products/all-products', {
            products: products,
            id: req.params.id
          });
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          next(_context2.t0);

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
}

module.exports = {
  getAllProducts: getAllProducts,
  getProductDetails: getProductDetails
};