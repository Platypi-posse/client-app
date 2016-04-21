require('dotenv').config();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var handlebars = require('hbs');

handlebars.registerHelper('eachimg', function(context, options) {
  var ret = "";

  for(var i=0, j=1; i<j; i++) {
    ret = ret + options.fn(context[i]);
  }

  return ret;
});

// require database
require('./db/database');

var controllers = require('./controllers/index');
var users = require('./controllers/users');
var contribute = require('./controllers/contribute');
var eachlocation = require('./controllers/eachlocation');
var locations = require('./controllers/locations');
var images = require('./controllers/images');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
// setup sessions
app.use(require('express-session')({
  secret: 'chichichiart',
  resave: false,
  saveUninitialzed: false
}));// end session weird

app.use('/', controllers);
app.use('/users', users);
app.use('/contribute', contribute);
app.use('/eachlocation', eachlocation);
app.use('/locations', locations);
app.use('/images', images);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});




module.exports = app;
