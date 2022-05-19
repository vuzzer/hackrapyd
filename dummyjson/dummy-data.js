const axios = require('axios');
const Product = require('../models/product.model');


async function getAllProducts() {
axios.get('https://dummyjson.com/products').then(data => {
   data.data.products.forEach(element => {
    const product = new Product(element);
    product.save();
  });
});
}

module.exports = { getAllProducts };
