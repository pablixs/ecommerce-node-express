const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet =  require('helmet');

const index_router = require('./routes/index.routes');
const user_router = require('./routes/users_routes/users.routes');
const products_router = require('./routes/products_routes/products.routes');
const cart_router = require('./routes/carrito.routes');
const payments_router = require('./routes/payment.routes');
const mail_router = require('./routes/mail.routes');

//* dev
const testRouter = require('./routes/test');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(helmet())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index_router);
app.use('/perfil', user_router);
app.use('/productos', products_router);
app.use('/carrito', cart_router);
app.use('/pagar', payments_router)
app.use('/mail', mail_router);
//* dev
app.use('/api', testRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
