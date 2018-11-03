var createError = require('http-errors');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session	= require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var bcrypt = require('bcryptjs');
var methodOverride = require('method-override');

var index = require('./routes/index');
var users = require('./routes/users');
//var admin = require('./routes/admin');

var mongoose = require('mongoose');
var mongoDB = 'mongodb://georh:geo-rh*2018*bdd@ds147033.mlab.com:47033/geo_rh_db' ;//mongodb://localhost:27017/geo_rh_db 'mongodb://georh:geo-rh*2018*bdd@ds147033.mlab.com:47033/geo_rh_db';
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var app = express();


app.use(session({
  secret: 'ungrainderizsemécentrécoltés',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge:3600000}
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// use passport session
app.use(passport.initialize());
app.use(passport.session());


app.use(flash());
app.use(function (req, res, next){
    res.locals.messages = require('express-messages')(req, res);
    next();
});

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});


app.use('/', index);
app.use('/users', users);
//app.use('/admin', admin);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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