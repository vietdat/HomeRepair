var express = require('express');
var router = express.Router();
var decode = require('decode-html');
var articleRouter=require("./article");
var categoryRouter=require("./category");
var gioithieu=require("./gioithieu");
var resource=require("./resource");
/* GET home page. */
router.get('/',function(req,res,next){
    res.redirect('/hungthinh-admin/category');
})
router.use('/article',articleRouter);
router.use('/category',categoryRouter);
router.use('/gioi-thieu',gioithieu);
router.use('/resource',resource);
module.exports = router;
