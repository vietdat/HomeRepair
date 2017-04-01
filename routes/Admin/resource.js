var express = require('express');
var router = express.Router();
router.get('/',function(req,res,next){
    res.render('Admin/resource',{layout:'Admin/layout'});
})
module.exports = router;
