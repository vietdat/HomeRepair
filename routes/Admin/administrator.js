var express 				= require('express');
var router 					= express.Router();
var decode 					= require('decode-html');
var gioithieu				= require("./gioithieu");
var dongiasuachuacaitao 	= require("./dongiasuachuacaitao");
var resource				= require("./resource");
var login 					= require('./login');

function isLoggedIn(req, res, next) {  
  if (req.isAuthenticated())
      return next();
  res.redirect('/hungthinh-admin/login');
}

router.get('/',isLoggedIn,function(req,res,next){
    res.redirect('/hungthinh-admin/gioi-thieu');
});

router.use('/login',login);

router.use('/gioi-thieu',isLoggedIn,gioithieu);

router.use('/don-gia-sua-chua-cai-tao',isLoggedIn,dongiasuachuacaitao);

router.use('/resource',isLoggedIn,resource);

module.exports = router;
