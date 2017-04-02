var express 		= require('express');
var path 			= require('path');
var fs = require('fs');
var favicon 		= require('serve-favicon');
var logger 			= require('morgan');
var util = require('util');
var multer = require('multer');
var cookieParser 	= require('cookie-parser');
var bodyParser 		= require('body-parser');
var session = require('express-session')
var mongoose 		= require('mongoose');
var User=require('./model/user');
mongoose.Promise 	= global.Promise;
mongoose.connect('mongodb://hungthinh:tumotdenchin@ds013545.mlab.com:13545/demo');
var home 			= require('./routes/home.route');
var introduction 	= require('./routes/introduction.route');
//admin router
var administrator = require('./routes/Admin/administrator');
var filemanager = require('./filemanager');
//Auth
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//config passport

passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log(username);
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//init passport
app.set('trust proxy', 1) // trust first proxy
app.use(session({ secret: 'keyboard cat' }));
  app.use(passport.initialize());
  app.use(passport.session());
//Config filemanager
//using for file filemanager
var config = JSON.parse(
  fs.readFileSync('public/Filemanager/scripts/filemanager.config.js')
);
config.connector = {

  serverRoot: './public',

  fmSrcPath: '/Filemanager',

  uploader: multer({ dest: 'uploads' })
};
config.options.fileRoot = require('path').join(__dirname, 'public/');
var logger = {
  debug: util.log,
  info: util.log,
  error: util.log
};
var fm = filemanager(config, logger);
app.use('/fm', fm);
//Admin page
app.use('/hungthinh-admin', administrator);
// uncomment after placing your favicon in /public


app.use('/', home);
app.use('/gioi-thieu', introduction);

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
