const Order = require('../models/order.model');
const User = require('../models/user.model');

async function getOrders(req, res) {
  try {
    const orders = await Order.findAllForUser(res.locals.uid);
    res.render('customer/orders/all-orders', {
      orders: orders
    });
  } catch (error) {
    next(error);
  }
}

async function addOrder(req, res, next) {
  const cart = res.locals.cart;

  let userDocument;
  try {
    userDocument = await User.findById(res.locals.uid);
  } catch (error) {
    return next(error);
  }

  const order = new Order(cart, userDocument);

   try {
    await order.save();
  } catch (error) {
    next(error);
    return;
  } 

  req.session.cart = null;

  res.json({order: {productData: cart}});
}

async function buy(req, res, next) {
  const cart = res.locals.cart;

  let userDocument;
  try {
    userDocument = await User.findById(res.locals.uid);
  } catch (error) {
    return next(error);
  }

    const order = new Order(req.body.order.productData, req.body.order.userData, 'PAID');

  try {
    order.save();
  } catch (error) {
    next(error);
    return;
  }

  req.session.cart = null;

  res.json({order: {productData: cart, userData: userDocument}});
}

module.exports = {
  addOrder: addOrder,
  getOrders: getOrders,
  buy: buy
};
