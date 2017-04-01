var express = require('express');
var router = express.Router();
var Article=require('../../model/article');
var decode = require('decode-html');

/* GET home page. */
router.get('/', function(req, res, next) {
    //get category list
    Article.find(function(err,articleList){
        if (err) throw err;
        else{
            articleList.forEach(function(element) {
                console.log(decode(element.content));
                element.content=decode(element.content);
            }, this);
            res.locals.articleList=articleList;
            res.render('Admin/article',{layout:'Admin/layout'});
        }
    })
 // res.render('index', { title: 'Express' });
});
router.post('/add',function(req,res,next){
    var article=new Article(req.body);
    article.save(function(err){
  if (err) throw err;
  else res.redirect('/article');
    })
})
router.post('/delete',function(req,res,next){
    var id=req.body.id;
    Article.remove({_id:id},function(err){
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
