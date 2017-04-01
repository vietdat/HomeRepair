var express = require('express');
var router = express.Router();
var decode = require('decode-html');
var articleRouter=require("./article");
var categoryRouter=require("./category");
/* GET home page. */
router.get('/',function(req,res,next){
    res.redirect('/hungthinh-admin/category');
})
router.use('/article',articleRouter);
router.use('/category',categoryRouter);
module.exports = router;
