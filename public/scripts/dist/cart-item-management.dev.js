"use strict";

var cartItemUpdateFormElements = document.querySelectorAll('.cart-item-management');
var cartTotalPriceElement = document.getElementById('cart-total-price');
var cartBadgeElements = document.querySelectorAll('.nav-items .badge');

function updateCartItem(event) {
  var form, productId, quantity, response, responseData, cartItemTotalPriceElement, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, cartBadgeElement;

  return regeneratorRuntime.async(function updateCartItem$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          event.preventDefault();
          form = event.target;
          productId = form.dataset.productid;
          quantity = form.firstElementChild.value;
          _context.prev = 4;
          _context.next = 7;
          return regeneratorRuntime.awrap(fetch('/cart/items', {
            method: 'PATCH',
            body: JSON.stringify({
              productId: productId,
              quantity: quantity
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          }));

        case 7:
          response = _context.sent;
          _context.next = 14;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](4);
          alert('Something went wrong!');
          return _context.abrupt("return");

        case 14:
          if (response.ok) {
            _context.next = 17;
            break;
          }

          alert('Something went wrong!');
          return _context.abrupt("return");

        case 17:
          _context.next = 19;
          return regeneratorRuntime.awrap(response.json());

        case 19:
          responseData = _context.sent;

          if (responseData.updatedCartData.updatedItemPrice === 0) {
            form.parentElement.parentElement.remove();
          } else {
            cartItemTotalPriceElement = form.parentElement.querySelector('.cart-item-price');
            cartItemTotalPriceElement.textContent = responseData.updatedCartData.updatedItemPrice.toFixed(2);
          }

          cartTotalPriceElement.textContent = responseData.updatedCartData.newTotalPrice.toFixed(2);
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 25;

          for (_iterator = cartBadgeElements[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            cartBadgeElement = _step.value;
            cartBadgeElement.textContent = responseData.updatedCartData.newTotalQuantity;
          }

          _context.next = 33;
          break;

        case 29:
          _context.prev = 29;
          _context.t1 = _context["catch"](25);
          _didIteratorError = true;
          _iteratorError = _context.t1;

        case 33:
          _context.prev = 33;
          _context.prev = 34;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 36:
          _context.prev = 36;

          if (!_didIteratorError) {
            _context.next = 39;
            break;
          }

          throw _iteratorError;

        case 39:
          return _context.finish(36);

        case 40:
          return _context.finish(33);

        case 41:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 10], [25, 29, 33, 41], [34,, 36, 40]]);
}

var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {
  for (var _iterator2 = cartItemUpdateFormElements[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
    var formElement = _step2.value;
    formElement.addEventListener('submit', updateCartItem);
  }
} catch (err) {
  _didIteratorError2 = true;
  _iteratorError2 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
      _iterator2["return"]();
    }
  } finally {
    if (_didIteratorError2) {
      throw _iteratorError2;
    }
  }
}