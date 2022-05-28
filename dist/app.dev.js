"use strict";

var path = require('path');

var express = require('express');

var expressSession = require('express-session');

var logger = require('morgan');

var createSessionConfig = require('./config/session');

var errorHandlerMiddleware = require('./middlewares/error-handler');

var checkAuthStatusMiddleware = require('./middlewares/check-auth');

var cartMiddleware = require('./middlewares/cart');

var updateCartPricesMiddleware = require('./middlewares/update-cart-prices');

var notFoundMiddleware = require('./middlewares/not-found');

var productsRoutes = require('./routes/products.routes');

var baseRoutes = require('./routes/base.routes');

var cartRoutes = require('./routes/cart.routes');

var chatRoutes = require('./routes/chat.routes');

var rapydRoutes = require('./routes/rapyd.routes');

var db = require('./data/database');

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
app.use(productsRoutes);
app.use('/rapyd', rapydRoutes);
app.use('/cart', cartRoutes); //Chat

app.use('/chat', chatRoutes);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
db.connectToDatabase().then(function () {
  console.log('connected to database');
})["catch"](function (error) {
  console.log('Failed to connect to the database!');
  console.log(error);
});
module.exports = app;