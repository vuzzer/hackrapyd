"use strict";

var Order = require('../models/order.model');

var User = require('../models/user.model');

function getOrders(req, res) {
  var orders;
  return regeneratorRuntime.async(function getOrders$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Order.findAllForUser(res.locals.uid));

        case 3:
          orders = _context.sent;
          res.render('customer/orders/all-orders', {
            orders: orders
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

function addOrder(req, res, next) {
  var cart, userDocument, order;
  return regeneratorRuntime.async(function addOrder$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          cart = res.locals.cart;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(User.findById(res.locals.uid));

        case 4:
          userDocument = _context2.sent;
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](1);
          return _context2.abrupt("return", next(_context2.t0));

        case 10:
          order = new Order(cart, userDocument);
          _context2.prev = 11;
          _context2.next = 14;
          return regeneratorRuntime.awrap(order.save());

        case 14:
          _context2.next = 20;
          break;

        case 16:
          _context2.prev = 16;
          _context2.t1 = _context2["catch"](11);
          next(_context2.t1);
          return _context2.abrupt("return");

        case 20:
          req.session.cart = null;
          res.json({
            order: {
              productData: cart
            }
          });

        case 22:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 7], [11, 16]]);
}

function buy(req, res, next) {
  return regeneratorRuntime.async(function buy$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          req.session.cart = null;
          console.log("sessions : " + req.session.cart);
          res.status(201).json({
            message: 'Buy successful!'
          });

        case 3:
        case "end":
          return _context3.stop();
      }
    }
  });
}

module.exports = {
  addOrder: addOrder,
  getOrders: getOrders,
  buy: buy
};