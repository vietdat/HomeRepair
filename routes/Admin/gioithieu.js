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

    if(req.body.url && req.body.url==="") {
        console.log("Missing url");
        return;
    }

    if(req.body.title && req.body.title === "") {
        console.log("Missing url");
        return;
    }

    if(req.body.content && req.body.content === "") {
        console.log("Missing url");
        return;
    }

    if(req.body.alt && req.body.altImage === "") {
        console.log("Missing url");
        return;
    }

    if(req.body.urlImage && req.body.urlImage === "") {
        console.log("Missing url");
        return;
    }

    if(req.body.description && req.body.description === "") {
        console.log("Missing url");
        return;
    }

    var item=new Introduction({
        url:req.body.url,
        title:req.body.title,
        content:req.body.content,
        image:{
            'alt':req.body.altImage,
            'src':req.body.urlImage
        },
        description:req.body.description
    });

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
