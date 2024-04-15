var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 系统用户
var indexRouter = require('./routes/index');
// 轮播图
var carouselmapRouter = require('./routes/carouselmap');
// 订单管理
var OrderRouter = require('./routes/order');
// 售后管理
var afterSaleRouter = require('./routes/afterSale');
// 商品库存
var shopRouter = require('./routes/shop');
// 财务管理
var FinanceRouter = require('./routes/finance');
// 头像
var AvatarRouter = require('./routes/avatar');
var BalanceRouter = require('./routes/balance');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', carouselmapRouter);
app.use('/', AvatarRouter);
app.use('/', OrderRouter);
app.use('/', afterSaleRouter);
app.use('/', shopRouter)
app.use('/', FinanceRouter)
app.use('/', BalanceRouter)
// app.use('/login', loginRouter);
// app.use('/register', registerRouter);
// app.listen('8080')

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
