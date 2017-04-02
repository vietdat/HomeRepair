var express 				= require('express');
var router 					= express.Router();
var decode 					= require('decode-html');
var gioithieu				= require("./gioithieu");
var dichvusuachuacaitao 	= require("./dichvusuachuacaitao");
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

router.use('/dich-vu-sua-chua-cai-tao',isLoggedIn,dichvusuachuacaitao);

router.use('/resource',isLoggedIn,resource);

module.exports = router;
