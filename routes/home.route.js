var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('Home/homepage', {
  	title: "First page",
  	body: "body"
  });
});

router.get('/home', function(req, res, next) {
 	res.render('Home/homepage', {
  	title: "First page",
  	body: "body"
  });
});

module.exports = router;
