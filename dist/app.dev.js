"use strict";

var path = require('path');

var express = require('express');

var csrf = require('csurf');

var expressSession = require('express-session');

var logger = require('morgan');

var createSessionConfig = require('./config/session');

var addCsrfTokenMiddleware = require('./middlewares/csrf-token');

var errorHandlerMiddleware = require('./middlewares/error-handler');

var checkAuthStatusMiddleware = require('./middlewares/check-auth');

var protectRoutesMiddleware = require('./middlewares/protect-routes');

var cartMiddleware = require('./middlewares/cart');

var updateCartPricesMiddleware = require('./middlewares/update-cart-prices');

var notFoundMiddleware = require('./middlewares/not-found');

var authRoutes = require('./routes/auth.routes');

var productsRoutes = require('./routes/products.routes');

var baseRoutes = require('./routes/base.routes');

var adminRoutes = require('./routes/admin.routes');

var cartRoutes = require('./routes/cart.routes');

var ordersRoutes = require('./routes/orders.routes');

var chatRoutes = require('./routes/chat.routes');

var rapydRoutes = require('./routes/rapyd.routes');

var db = require('./data/database');

var dummyjson = require('./dummyjson/dummy-data');

var app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(logger('dev'));
app.use(express["static"]('public'));
app.use('/products/assets', express["static"]('product-data'));
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
var sessionConfig = createSessionConfig();
app.use(expressSession(sessionConfig)); //app.use(csrf());

app.use(cartMiddleware);
app.use(updateCartPricesMiddleware); //app.use(addCsrfTokenMiddleware);

app.use(checkAuthStatusMiddleware);
app.use(baseRoutes);
app.use(authRoutes);
app.use(productsRoutes);
app.use('/rapyd', rapydRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', ordersRoutes);
app.use('/admin', protectRoutesMiddleware, adminRoutes); //Chat

app.use('/chat', chatRoutes);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
db.connectToDatabase().then(function () {
  console.log('connected to database'); //dummyjson.getAllProducts();
})["catch"](function (error) {
  console.log('Failed to connect to the database!');
  console.log(error);
});
module.exports = app;