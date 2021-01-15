var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
//var passport = require('passport');

var app = express();
app.set('views', require('path').join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(bodyParser.json())
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./middleware/auth'));
app.use(cors());

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, x-access-token, X-CarWash-Header");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

// routes
app.use('/', require('./routes/index'));
app.use('/employees', require('./routes/employees'));
app.use('/users', require('./routes/users'));
app.use('/clients', require('./routes/clients'));
app.use('/packages', require('./routes/package'));
app.use('/extras', require('./routes/extra'));
app.use('/reservations', require('./routes/reservation'));
app.use('/support', require('./routes/support'));
app.use('/files', require('./routes/files'));

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
  res.json({
		message: err.message,
		error: err
	});
});

module.exports = app;
