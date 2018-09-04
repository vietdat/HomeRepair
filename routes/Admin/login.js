var express = require('express');
var router = express.Router();
var passport = require('passport');
var userModel = require('../../model/user');
/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/hungthinh-admin/');
  } else {
    next();
  }
}, function(req, res) {
  res.render('Admin/login');
})
router.post('/',
  passport.authenticate('local', {
    successRedirect: '/hungthinh-admin/gioi-thieu',
    failureRedirect: '/hungthinh-admin/'
  })
);

// router.get('/create-new-user', function(req, res, next) {
//   var user = {};
//   user['username'] = 'admin1';
//   user['password'] = 'admin1';

//   var x = new userModel(user);
//   x.save();
//   res.send("success")
// });
module.exports = router;
