const mongodb = require('mongodb');

const db = require('../data/database');

class Product {
  constructor(productData) {
    this.title = productData.title;
    this.description = productData.description;
    this.price = +productData.price;
    this.category = productData.category;
    this.description = productData.description;
    this.thumbnail = productData.thumbnail;
    this.stock = productData.stock;
    this.rating = productData.rating;
    this.brand = this.brand,
    this.discountPercentage = this.discountPercentage,
    this.image = productData.image; // the name of the image file

    //this.updateImageData();
    if (productData._id) {
      this.id = productData._id.toString();
    }
  }

  static async findById(productId) {
    let prodId;
    try {
      prodId = new mongodb.ObjectId(productId);
    } catch (error) {
      error.code = 404;
      throw error;
    }
    const product = await db
      .getDb()
      .collection('products')
      .findOne({ _id: prodId });

    if (!product) {
      const error = new Error('Could not find product with provided id.');
      error.code = 404;
      throw error;
    }

    return new Product(product);
  }

  static async findAll() {
    const products = await db.getDb().collection('products').find().toArray();

    return products.map(function (productDocument) {
      return new Product(productDocument);
    });
  }

  static async findMultiple(ids) {
    const productIds = ids.map(function(id) {
      return new mongodb.ObjectId(id);
    })
    
    const products = await db
      .getDb()
      .collection('products')
      .find({ _id: { $in: productIds } })
      .toArray();

    return products.map(function (productDocument) {
      return new Product(productDocument);
    });
  }

  updateImageData() {
    this.imagePath = `product-data/images/${this.image}`;
    this.imageUrl = `/products/assets/images/${this.image}`;
  }

  async save() {
    const productData = {
      title: this.title,
      description: this.description,
      price: this.price,
      thumbnail: this.thumbnail,
      stock: this.stock,
      rating: this.rating,
      brand: this.brand,
      discountPercentage: this.discountPercentage,
      image: this.image,
      category: this.category,
    };

    if (this.id) {
      const productId = new mongodb.ObjectId(this.id);

      if (!this.image) {
        delete productData.image;
      }

      await db.getDb().collection('products').updateOne(
        { _id: productId },
        {
          $set: productData,
        }
      );
    } else {
      await db.getDb().collection('products').insertOne(productData);
    }
  }

  replaceImage(newImage) {
    this.image = newImage;
    this.updateImageData();
  }

  remove() {
    const productId = new mongodb.ObjectId(this.id);
    return db.getDb().collection('products').deleteOne({ _id: productId });
  }

  static async search(searchTerm) {
    const products = await db.getDb().collection('products').find({ $text: { $search: searchTerm } }).toArray();
    return products.map(function (productDocument) {
      return new Product(productDocument);
    });
  }
}

module.exports = Product;
