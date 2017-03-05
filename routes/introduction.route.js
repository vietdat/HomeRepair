var express = require('express');
var router = express.Router();

router.get('/abc', function(req, res, next) {
  res.send('Home page');
});

router.get('/bc', function(req, res, next) {
  res.send('Home page');
});

module.exports = router;
