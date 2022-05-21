"use strict";

//const addToCartButtonElement = document.getElementsByClassName('add-to-cart');
var cartBadgeElements = document.querySelectorAll('#panier');

function addToCart(productId) {
  var response, responseData, newTotalQuantity, items, item, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, cartBadgeElement;

  return regeneratorRuntime.async(function addToCart$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
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
          response = _context.sent;
          _context.next = 10;
          break;

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          alert('Something went wrong!');
          return _context.abrupt("return");

        case 10:
          if (!response.ok) {//return;
          }

          _context.next = 13;
          return regeneratorRuntime.awrap(response.json());

        case 13:
          responseData = _context.sent;
          newTotalQuantity = responseData.newTotalItems;

          if (parseInt(newTotalQuantity) === 1) {
            chatbot.push();
          } //Empty shopping cart


          $("#my-carts").empty(); //Create the cart of new product added to shopping cart

          for (i = 0; i < responseData.cart.items.length; i++) {
            items = responseData.cart.items[i];
            item = " <div class=\"col mb-6\">\n    <div class=\"card h-10 div2\">\n    <img src=\"".concat(items.product.thumbnail, "\" alt=\"\" class=\"card-img-top\">\n    <div class=\"card-body\">\n      <div class=\"card-title h5\">\n      ").concat(items.product.title, "\n      </div>\n      <a href=\"#\" class=\"btn btn-outline-primary\" data-price=\"").concat(items.product.price, "\"><span\n          class=\"h5\">").concat(items.product.price, "</span></a>\n      <span style=\"font-size: 18px;\" class=\"h3 badge badge-warning text-danger\">&times;</span>\n      <span style=\"font-size: 18px;\" class=\"h3 mx-auto badge badge-warning text-success\">").concat(items.quantity, "</span>\n    </div>\n    </div>\n    </div>"); //Add    

            $(item).appendTo("#my-carts");
          }

          console.log(responseData); //Update total amount

          if (responseData.cart.items.length > 1) {
            $("#total-amount").text("( $ ".concat(responseData.cart.totalPrice, " )"));
          } //Update item's number of shopping cart


          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 23;

          for (_iterator = cartBadgeElements[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            cartBadgeElement = _step.value;
            cartBadgeElement.textContent = newTotalQuantity;
          }

          _context.next = 31;
          break;

        case 27:
          _context.prev = 27;
          _context.t1 = _context["catch"](23);
          _didIteratorError = true;
          _iteratorError = _context.t1;

        case 31:
          _context.prev = 31;
          _context.prev = 32;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 34:
          _context.prev = 34;

          if (!_didIteratorError) {
            _context.next = 37;
            break;
          }

          throw _iteratorError;

        case 37:
          return _context.finish(34);

        case 38:
          return _context.finish(31);

        case 39:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 6], [23, 27, 31, 39], [32,, 34, 38]]);
}

document.querySelectorAll('.add-to-cart').forEach(function (item) {
  item.addEventListener('click', function (event) {
    addToCart(item.dataset.productid);
  });
});