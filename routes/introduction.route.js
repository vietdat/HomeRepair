var express = require('express');
var router = express.Router();

router.get('/sua-chua-cai-tao-hung-thinh', function(req, res, next) {
  res.render('GioiThieu/suachuacaitao', {
  	title: "Sửa chữa cải tạo Hưng Thịnh",
  	body: "body"
  });
});

router.get('/bc', function(req, res, next) {
  res.send('Home page');
});

module.exports = router;
