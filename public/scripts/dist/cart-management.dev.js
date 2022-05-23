"use strict";

//const addToCartButtonElement = document.getElementsByClassName('add-to-cart');
var cartBadgeElements = document.querySelectorAll('#panier');

function add(quantity, productId) {
  var response, responseData;
  return regeneratorRuntime.async(function add$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          quantity = parseInt(quantity) + 1;
          _context.prev = 1;
          _context.next = 4;
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

        case 4:
          response = _context.sent;
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](1);
          alert('Something went wrong!');
          return _context.abrupt("return");

        case 11:
          if (response.ok) {
            _context.next = 14;
            break;
          }

          alert('Something went wrong!');
          return _context.abrupt("return");

        case 14:
          _context.next = 16;
          return regeneratorRuntime.awrap(response.json());

        case 16:
          responseData = _context.sent;
          update(responseData);

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 7]]);
}

function minus(quantity, productId) {
  var response, responseData;
  return regeneratorRuntime.async(function minus$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          quantity = parseInt(quantity) - 1;
          _context2.prev = 1;
          _context2.next = 4;
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

        case 4:
          response = _context2.sent;
          _context2.next = 11;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](1);
          alert('Something went wrong!');
          return _context2.abrupt("return");

        case 11:
          if (response.ok) {
            _context2.next = 14;
            break;
          }

          alert('Something went wrong!');
          return _context2.abrupt("return");

        case 14:
          _context2.next = 16;
          return regeneratorRuntime.awrap(response.json());

        case 16:
          responseData = _context2.sent;
          update(responseData);

        case 18:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 7]]);
}

function delToCart(productId) {
  var response, responseData;
  return regeneratorRuntime.async(function delToCart$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(fetch('/cart/items/del', {
            method: 'POST',
            body: JSON.stringify({
              productId: productId
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          }));

        case 3:
          response = _context3.sent;
          _context3.next = 10;
          break;

        case 6:
          _context3.prev = 6;
          _context3.t0 = _context3["catch"](0);
          alert('Something went wrong!');
          return _context3.abrupt("return");

        case 10:
          if (!response.ok) {//return;
          }

          _context3.next = 13;
          return regeneratorRuntime.awrap(response.json());

        case 13:
          responseData = _context3.sent;
          update(responseData);

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 6]]);
}

function addToCart(productId) {
  var response, responseData;
  return regeneratorRuntime.async(function addToCart$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(fetch('/cart/items', {
            method: 'POST',
            body: JSON.stringify({
              productId: productId
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          }));

        case 3:
          response = _context4.sent;
          _context4.next = 10;
          break;

        case 6:
          _context4.prev = 6;
          _context4.t0 = _context4["catch"](0);
          alert('Something went wrong!');
          return _context4.abrupt("return");

        case 10:
          if (!response.ok) {//return;
          }

          _context4.next = 13;
          return regeneratorRuntime.awrap(response.json());

        case 13:
          responseData = _context4.sent;
          update(responseData);

        case 15:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 6]]);
}

function update(responseData) {
  var newTotalQuantity = responseData.newTotalItems;

  if (parseInt(newTotalQuantity) === 1) {
    chatbot.push();
  } //Empty shopping cart


  $("#my-carts").empty(); //Create the cart of new product added to shopping cart

  for (i = 0; i < responseData.cart.items.length; i++) {
    var item = responseData.cart.items[i];
    var cartShopping = " <div class=\"col mb-6\">\n      <div class=\"card h-10 div2\">\n      <img src=\"".concat(item.product.thumbnail, "\" alt=\"\" class=\"card-img-top\">\n      <div class=\"card-body\">\n        <div class=\"card-title h5\">\n        ").concat(item.product.title, "\n        </div>\n        <a href=\"#\" class=\"btn btn-outline-primary\" data-price=\"").concat(item.product.price, "\"><span\n            class=\"h5\">").concat(item.product.price, "</span></a>\n        <span style=\"font-size: 18px;cursor:pointer;\" onclick=\"delToCart('").concat(item.product.id, "')\"   class=\"h3 badge badge-warning text-danger\">&times;</span>\n\n        <button class=\"btn\" onclick=\"add('").concat(item.quantity, "','").concat(item.product.id, "')\">\n              <i class=\"fa-solid fa-plus\"></i>\n        </button>\n\n        <span style=\"font-size: 18px;\" class=\"h3 mx-auto badge badge-warning text-success\">article ").concat(item.quantity, "</span>\n\n        <button class=\"btn\"  onclick=\"minus('").concat(item.quantity, "','").concat(item.product.id, "')\">\n                <i class=\"fa-solid fa-minus\"></i>\n        </button>\n      </div>\n      </div>\n      </div>"); //Add    

    $(cartShopping).appendTo("#my-carts");
  } //Shopping cart empty `buy` button is hidden else shown


  if (responseData.cart.items.length > 0) {
    var button = "<a href=\"#\" class=\"btn btn-success w-100\" onclick=\"paid('".concat(responseData.cart.totalPrice, "')\"><span\n      class=\" h4\">Buy</span> <span class=\"h4\" id=\"total-amount\">").concat(responseData.cart.totalPrice, "$</span></a>");
    $(".button-buy").empty();
    $(button).appendTo(".button-buy");
  } else {
    $(".button-buy").empty();
  } //Update item's number of shopping cart


  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = cartBadgeElements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var cartBadgeElement = _step.value;
      cartBadgeElement.textContent = newTotalQuantity;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

document.querySelectorAll('.add-to-cart').forEach(function (item) {
  item.addEventListener('click', function (event) {
    addToCart(item.dataset.productid);
  });
});