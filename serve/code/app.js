var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 引入子路由
var accountRouter = require('./routes/account');//账号管理模块
var loginRouter = require('./routes/login'); //登录管理模块
var goodsRouter = require('./routes/goods'); //商品管理模块
var stockRouter = require('./routes/stockadd');//商品入库管理模块
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//分配子路由
app.use('/account', accountRouter);//账号管理模块
app.use('/login', loginRouter); //登录管理模块
app.use('/goods', goodsRouter); //商品管理模块
app.use('/stockadd', stockRouter);//商品入库管理模块

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
// 监听端口
app.listen(888, () => {
  console.log('服务器启动成功，地址是：http://127.0.0.1:888');
  
})
module.exports = app;
