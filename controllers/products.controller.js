const Product = require('../models/product.model');

async function getAllProducts(req, res, next) {
  try {
    const products = await Product.findAll();
    res.render('customer/products/all-products', { products: products, id: null });
  } catch (error) {
    next(error);
  }
}

async function getProductDetails(req, res, next) {
  try {
    //const product = await Product.findById(req.params.id);
    const products = await Product.findAll();
    res.render('customer/products/all-products', { products: products, id: req.params.id });
  } catch (error) {
    next(error);
  }
}

async function searchProducts(req, res, next) {
  try {
    const products = await Product.search(req.body.search);
    res.status(201).json({
      product: res.render('<html></html>')
    });
  } catch (error) {
    next(error);
    return
  }

}

module.exports = {
  getAllProducts: getAllProducts,
  searchProducts: searchProducts,
  getProductDetails: getProductDetails
};
