var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()
var bodyParser = require('body-parser')

const mongoose = require('mongoose')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin')
var app = express();
app.use(bodyParser.json())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const cors = require("cors")
app.use(cors({
  origin: process.env.CLIENT_IP,
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', "PATCH", "DELETE"],
  credentials: true,
  optionsSuccessStatus: 200,
}))


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', indexRouter);
app.use('/admin', adminRouter);

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

mongoose.connect('mongodb://0.0.0.0:27017/notimail', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("connected to database")).catch((error) => console.log(error))


module.exports = app;
