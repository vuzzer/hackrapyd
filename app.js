const path = require('path');

const express = require('express');
const expressSession = require('express-session');
const logger = require('morgan');
const createSessionConfig = require('./config/session');
const errorHandlerMiddleware = require('./middlewares/error-handler');
const checkAuthStatusMiddleware = require('./middlewares/check-auth');
const cartMiddleware = require('./middlewares/cart');
const updateCartPricesMiddleware = require('./middlewares/update-cart-prices');
const notFoundMiddleware = require('./middlewares/not-found');
const productsRoutes = require('./routes/products.routes');
const baseRoutes = require('./routes/base.routes');
const cartRoutes = require('./routes/cart.routes');
const chatRoutes = require('./routes/chat.routes');
const rapydRoutes = require('./routes/rapyd.routes');
const ordersRoutes = require('./routes/orders.routes');
const db = require('./data/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.static('public'));
app.use('/products/assets', express.static('product-data'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const sessionConfig = createSessionConfig();

app.use(expressSession(sessionConfig));
//app.use(csrf());

app.use(cartMiddleware);
app.use(updateCartPricesMiddleware);

//app.use(addCsrfTokenMiddleware);
app.use(checkAuthStatusMiddleware);

app.use(baseRoutes);
app.use(productsRoutes);
app.use('/rapyd', rapydRoutes)
app.use('/orders', ordersRoutes);
app.use('/cart', cartRoutes);


//Chat
app.use('/chat', chatRoutes);



db.connectToDatabase()
.then(function () {
    console.log('connected to database');
})
.catch(function (error) {
    console.log('Failed to connect to the database!');
    console.log(error);
});

module.exports = app;