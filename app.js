var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 系统用户
var indexRouter = require('./routes/index');
// 居民信息
var residentsRouter = require('./routes/residents');
// 物资管理
var SuppliesRouter = require('./routes/supplies');
// 物资申请审批管理
var AuditRouter = require('./routes/audit');
// 诊断记录
var DiagnoseRouter = require('./routes/diagnose');
// 疫苗接种
var VaccineRouter = require('./routes/vaccine');
// 健康管理
var HealthRouter = require('./routes/health');
// 风险地区管理
var WarningRouter = require('./routes/warning');

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
app.use('/', residentsRouter);
app.use('/', SuppliesRouter);
app.use('/', AuditRouter);
app.use('/', DiagnoseRouter);
app.use('/', VaccineRouter);
app.use('/', HealthRouter);
app.use('/', WarningRouter)
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
