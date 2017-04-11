
var express 				= require('express');
var router 					= express.Router();
var decode 					= require('decode-html');
var gioithieu				= require("./gioithieu");
var dichvusuachuacaitao 	= require("./dichvusuachuacaitao");
var camnangsuachuanha		= require("./camnangsuachuanha");
var dongia					= require("./dongia");
var mangluoi 				= require("./mangluoi");
var resource				= require("./resource");
var login 					= require('./login');
var logout					= require('./logout');
var thucte 					= require('./thucte');

/* GET home page. */
function isLoggedIn(req, res, next) {  
  if (req.isAuthenticated())
      return next();
  res.redirect('/hungthinh-admin/login');
}

router.get('/',isLoggedIn,function(req,res,next){
    res.redirect('/hungthinh-admin/gioi-thieu');
});

router.use('/login',login);

router.use('/logout',logout);

router.use('/gioi-thieu',isLoggedIn,gioithieu);

router.use('/dich-vu-sua-chua-cai-tao',isLoggedIn,dichvusuachuacaitao);

router.use('/cam-nang-sua-chua-nha',isLoggedIn,camnangsuachuanha);

router.use('/don-gia',isLoggedIn,dongia);

router.use('/mang-luoi',isLoggedIn,mangluoi);

router.use('/thuc-te',isLoggedIn,thucte);

router.use('/resource',isLoggedIn,resource);

module.exports = router;
