"use strict";

function updateCartPrices(req, res, next) {
  var cart;
  return regeneratorRuntime.async(function updateCartPrices$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          cart = res.locals.cart;
          _context.next = 3;
          return regeneratorRuntime.awrap(cart.updatePrices());

        case 3:
          //req.session.cart = cart;
          next();

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

module.exports = updateCartPrices;