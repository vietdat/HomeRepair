var express = require('express');
var router = express.Router();
var decode = require('decode-html');
var articleRouter=require("./article");
var categoryRouter=require("./category");
var gioithieu=require("./gioithieu");
var resource=require("./resource");
var login=require('./login');
/* GET home page. */
function isLoggedIn(req, res, next) {  
  if (req.isAuthenticated())
      return next();
  res.redirect('/hungthinh-admin/login');
}
router.get('/',isLoggedIn,function(req,res,next){
    res.redirect('/hungthinh-admin/category');
});
router.use('/login',login);
router.use('/article',isLoggedIn,articleRouter);
router.use('/category',isLoggedIn,categoryRouter);
router.use('/gioi-thieu',isLoggedIn,gioithieu);
router.use('/resource',isLoggedIn,resource);

module.exports = router;
