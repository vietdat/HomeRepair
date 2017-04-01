var express = require('express');
var router = express.Router();
var Category=require('../../model/category');
/* GET home page. */
router.get('/', function(req, res, next) {
    //get category list
    Category.find(function(err,categoryList){
        if (err) throw err;
        else{
            res.locals.categoryList=categoryList;
            res.render('Admin/category',{layout:'Admin/layout'});
        }
    })
 // res.render('index', { title: 'Express' });
});
router.post('/add',function(req,res,next){
    var test=new Category(req.body);
    test.save(function(err){
  if (err) throw err;
  else res.redirect('/category');
    })
})
router.post('/delete',function(req,res,next){
    var id=req.body.id;
    Category.remove({_id:id},function(err){
        console.log(err);
        if (err){
            res.send(err);
        }
        else{
            res.send('success');
        }
    });    
    
})
module.exports = router;
