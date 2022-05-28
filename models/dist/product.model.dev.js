"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var mongodb = require('mongodb');

var db = require('../data/database');

var Product =
/*#__PURE__*/
function () {
  function Product(productData) {
    _classCallCheck(this, Product);

    this.title = productData.title;
    this.description = productData.description;
    this.price = +productData.price;
    this.category = productData.category;
    this.description = productData.description;
    this.thumbnail = productData.thumbnail;
    this.stock = productData.stock;
    this.rating = productData.rating;
    this.brand = this.brand, this.discountPercentage = this.discountPercentage, this.image = productData.image; // the name of the image file
    //this.updateImageData();

    if (productData._id) {
      this.id = productData._id.toString();
    }
  }

  _createClass(Product, [{
    key: "updateImageData",
    value: function updateImageData() {
      this.imagePath = "product-data/images/".concat(this.image);
      this.imageUrl = "/products/assets/images/".concat(this.image);
    }
  }, {
    key: "save",
    value: function save() {
      var productData, productId;
      return regeneratorRuntime.async(function save$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              productData = {
                title: this.title,
                description: this.description,
                price: this.price,
                thumbnail: this.thumbnail,
                stock: this.stock,
                rating: this.rating,
                brand: this.brand,
                discountPercentage: this.discountPercentage,
                image: this.image,
                category: this.category
              };

              if (!this.id) {
                _context.next = 8;
                break;
              }

              productId = new mongodb.ObjectId(this.id);

              if (!this.image) {
                delete productData.image;
              }

              _context.next = 6;
              return regeneratorRuntime.awrap(db.getDb().collection('products').updateOne({
                _id: productId
              }, {
                $set: productData
              }));

            case 6:
              _context.next = 10;
              break;

            case 8:
              _context.next = 10;
              return regeneratorRuntime.awrap(db.getDb().collection('products').insertOne(productData));

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "replaceImage",
    value: function replaceImage(newImage) {
      this.image = newImage;
      this.updateImageData();
    }
  }, {
    key: "remove",
    value: function remove() {
      var productId = new mongodb.ObjectId(this.id);
      return db.getDb().collection('products').deleteOne({
        _id: productId
      });
    }
  }], [{
    key: "findById",
    value: function findById(productId) {
      var prodId, product, error;
      return regeneratorRuntime.async(function findById$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              prodId = new mongodb.ObjectId(productId);
              _context2.next = 8;
              break;

            case 4:
              _context2.prev = 4;
              _context2.t0 = _context2["catch"](0);
              _context2.t0.code = 404;
              throw _context2.t0;

            case 8:
              _context2.next = 10;
              return regeneratorRuntime.awrap(db.getDb().collection('products').findOne({
                _id: prodId
              }));

            case 10:
              product = _context2.sent;

              if (product) {
                _context2.next = 15;
                break;
              }

              error = new Error('Could not find product with provided id.');
              error.code = 404;
              throw error;

            case 15:
              return _context2.abrupt("return", new Product(product));

            case 16:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[0, 4]]);
    }
  }, {
    key: "findAll",
    value: function findAll() {
      var products;
      return regeneratorRuntime.async(function findAll$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(db.getDb().collection('products').find().toArray());

            case 2:
              products = _context3.sent;
              return _context3.abrupt("return", products.map(function (productDocument) {
                return new Product(productDocument);
              }));

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
  }, {
    key: "findMultiple",
    value: function findMultiple(ids) {
      var productIds, products;
      return regeneratorRuntime.async(function findMultiple$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              productIds = ids.map(function (id) {
                return new mongodb.ObjectId(id);
              });
              _context4.next = 3;
              return regeneratorRuntime.awrap(db.getDb().collection('products').find({
                _id: {
                  $in: productIds
                }
              }).toArray());

            case 3:
              products = _context4.sent;
              return _context4.abrupt("return", products.map(function (productDocument) {
                return new Product(productDocument);
              }));

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      });
    }
  }, {
    key: "search",
    value: function search(searchTerm) {
      var products;
      return regeneratorRuntime.async(function search$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(db.getDb().collection('products').find({
                title: {
                  $regex: new RegExp(searchTerm, 'i')
                }
              }).toArray());

            case 2:
              products = _context5.sent;
              return _context5.abrupt("return", products.map(function (productDocument) {
                return new Product(productDocument);
              }));

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      });
    }
  }]);

  return Product;
}();

module.exports = Product;