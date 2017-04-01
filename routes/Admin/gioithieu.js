var express = require('express');
var router = express.Router();
var Introduction=require('../../model/gioithieu.model');
var decode = require('decode-html');

/* GET home page. */
router.get('/', function(req, res, next) {
    //get category list
    Introduction.find(function(err,IntroductionList){
        if (err) throw err;
        else{
            IntroductionList.forEach(function(element) {
                console.log(decode(element.content));
                element.content=decode(element.content);
            }, this);
            res.locals.IntroductionList=IntroductionList;
            res.render('Admin/gioithieu',{layout:'Admin/layout'});
        }
    })
 // res.render('index', { title: 'Express' });
});
router.post('/add',function(req,res,next){
    console.log(req.body);

     var item=new Introduction(req.body);
    item.save(function(err){
  if (err) throw err;
  else res.redirect('/hungthinh-admin/gioi-thieu');
    })
})
router.post('/delete',function(req,res,next){
    var id=req.body.id;
    Introduction.remove({_id:id},function(err){
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
