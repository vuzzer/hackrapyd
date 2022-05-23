"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Product = require('./product.model');

var Cart =
/*#__PURE__*/
function () {
  function Cart() {
    var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var totalQuantity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var totalPrice = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    _classCallCheck(this, Cart);

    this.items = items;
    this.totalQuantity = totalQuantity;
    this.totalPrice = totalPrice;
  }

  _createClass(Cart, [{
    key: "updatePrices",
    value: function updatePrices() {
      var productIds, products, deletableCartItemProductIds, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step, _ret, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, item;

      return regeneratorRuntime.async(function updatePrices$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              productIds = this.items.map(function (item) {
                return item.product.id;
              });
              _context.next = 3;
              return regeneratorRuntime.awrap(Product.findMultiple(productIds));

            case 3:
              products = _context.sent;
              deletableCartItemProductIds = [];
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 8;

              _loop = function _loop() {
                var cartItem = _step.value;
                var product = products.find(function (prod) {
                  return prod.id === cartItem.product.id;
                });

                if (!product) {
                  // product was deleted!
                  // "schedule" for removal from cart
                  deletableCartItemProductIds.push(cartItem.product.id);
                  return "continue";
                } // product was not deleted
                // set product data and total price to latest price from database


                cartItem.product = product;
                cartItem.totalPrice = cartItem.quantity * cartItem.product.price;
              };

              _iterator = this.items[Symbol.iterator]();

            case 11:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context.next = 18;
                break;
              }

              _ret = _loop();

              if (!(_ret === "continue")) {
                _context.next = 15;
                break;
              }

              return _context.abrupt("continue", 15);

            case 15:
              _iteratorNormalCompletion = true;
              _context.next = 11;
              break;

            case 18:
              _context.next = 24;
              break;

            case 20:
              _context.prev = 20;
              _context.t0 = _context["catch"](8);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 24:
              _context.prev = 24;
              _context.prev = 25;

              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }

            case 27:
              _context.prev = 27;

              if (!_didIteratorError) {
                _context.next = 30;
                break;
              }

              throw _iteratorError;

            case 30:
              return _context.finish(27);

            case 31:
              return _context.finish(24);

            case 32:
              if (deletableCartItemProductIds.length > 0) {
                this.items = this.items.filter(function (item) {
                  return deletableCartItemProductIds.indexOf(item.product.id) < 0;
                });
              } // re-calculate cart totals


              this.totalQuantity = 0;
              this.totalPrice = 0;
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context.prev = 38;

              for (_iterator2 = this.items[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                item = _step2.value;
                this.totalQuantity = this.totalQuantity + item.quantity;
                this.totalPrice = this.totalPrice + item.totalPrice;
              }

              _context.next = 46;
              break;

            case 42:
              _context.prev = 42;
              _context.t1 = _context["catch"](38);
              _didIteratorError2 = true;
              _iteratorError2 = _context.t1;

            case 46:
              _context.prev = 46;
              _context.prev = 47;

              if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                _iterator2["return"]();
              }

            case 49:
              _context.prev = 49;

              if (!_didIteratorError2) {
                _context.next = 52;
                break;
              }

              throw _iteratorError2;

            case 52:
              return _context.finish(49);

            case 53:
              return _context.finish(46);

            case 54:
            case "end":
              return _context.stop();
          }
        }
      }, null, this, [[8, 20, 24, 32], [25,, 27, 31], [38, 42, 46, 54], [47,, 49, 53]]);
    }
  }, {
    key: "addItem",
    value: function addItem(product) {
      var cartItem = {
        product: product,
        quantity: 1,
        totalPrice: product.price
      };

      for (var i = 0; i < this.items.length; i++) {
        var item = this.items[i];

        if (item.product.id === product.id) {
          cartItem.quantity = +item.quantity + 1;
          cartItem.totalPrice = item.totalPrice + product.price;
          this.items[i] = cartItem;
          this.totalQuantity++;
          this.totalPrice += product.price;
          return;
        }
      }

      this.items.push(cartItem);
      this.totalQuantity++;
      this.totalPrice += product.price;
    }
  }, {
    key: "removeItem",
    value: function removeItem(product) {
      var items = this.items.filter(function (item) {
        return item.product.id !== product.id;
      });
      this.items = items;
      this.totalQuantity--;
      this.totalPrice -= product.price;
    }
  }, {
    key: "updateItem",
    value: function updateItem(productId, newQuantity) {
      for (var i = 0; i < this.items.length; i++) {
        var item = this.items[i];

        if (item.product.id === productId && newQuantity > 0) {
          var cartItem = _objectSpread({}, item);

          var quantityChange = newQuantity - item.quantity;
          cartItem.quantity = newQuantity;
          cartItem.totalPrice = newQuantity * item.product.price;
          this.items[i] = cartItem;
          this.totalQuantity = this.totalQuantity + quantityChange;
          this.totalPrice += quantityChange * item.product.price;
          return {
            updatedItemPrice: cartItem.totalPrice
          };
        } else if (item.product.id === productId && newQuantity <= 0) {
          this.items.splice(i, 1);
          this.totalQuantity = this.totalQuantity - item.quantity;
          this.totalPrice -= item.totalPrice;
          return {
            updatedItemPrice: 0
          };
        }
      }
    }
  }]);

  return Cart;
}();

module.exports = Cart;