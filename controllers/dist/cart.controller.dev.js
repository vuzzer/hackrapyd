"use strict";

var Product = require('../models/product.model');

function getCart(req, res) {
  return regeneratorRuntime.async(function getCart$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          res.render('customer/cart/cart');

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
}

function addCartItem(req, res, next) {
  var product, cart;
  return regeneratorRuntime.async(function addCartItem$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Product.findById(req.body.productId));

        case 3:
          product = _context2.sent;
          _context2.next = 10;
          break;

        case 6:
          _context2.prev = 6;
          _context2.t0 = _context2["catch"](0);
          next(_context2.t0);
          return _context2.abrupt("return");

        case 10:
          cart = res.locals.cart;
          cart.addItem(product);
          req.session.cart = cart;
          res.status(201).json({
            message: 'Cart updated!',
            newTotalItems: cart.totalQuantity,
            cart: cart
          });

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 6]]);
}

function updateCartItem(req, res) {
  var cart = res.locals.cart;
  var updatedItemData = cart.updateItem(req.body.productId, +req.body.quantity);
  req.session.cart = cart;
  res.json({
    message: 'Item updated!',
    updatedCartData: {
      newTotalQuantity: cart.totalQuantity,
      newTotalPrice: cart.totalPrice,
      updatedItemPrice: updatedItemData.updatedItemPrice
    }
  });
}

module.exports = {
  addCartItem: addCartItem,
  getCart: getCart,
  updateCartItem: updateCartItem
};