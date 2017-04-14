var express                         = require('express');
var router                          = express.Router();
var ThucTeModel        = require('../../model/thucte.model');
var decode                          = require('decode-html');


router.get('/', function(req, res, next) {
    ThucTeModel.find(function(err, data){
        if (err) throw err;
        else{
            data.forEach(function(element) {
                element.content=decode(element.content);
            }, this);
            res.locals.data=data;
            res.render('Admin/thucte', {layout:'Admin/layout'});
        }
    })
});

router.post('/add',function(req,res,next){
    console.log(req.body);

    if(!req.body.url || req.body.url==="") {
        console.log("Missing url");
        res.render('error');
    }

    if(!req.body.title || req.body.title === "") {
        console.log("Missing title");
        res.render('error');
    }

    if(!req.body.altImage || req.body.altImage === "") {
        console.log("Missing altImage");
        res.render('error');
    }

    if(!req.body.urlImage || req.body.urlImage === "") {
        console.log("Missing urlImage");
        res.render('error');
    }

    if(!req.body.description || req.body.description === "") {
        console.log("Missing description");
        res.render('error');
    }

    if(!req.body.type || req.body.type === "") {
        console.log("Missing type");
        res.render('error');
    }

    var item = new ThucTeModel({
        url         : req.body.url,
        title       : req.body.title,
        content     : req.body.content,
        image       : {
                        'alt':req.body.altImage,
                        'src':req.body.urlImage
                    },
        type        : req.body.type,
        description : req.body.description
    });

    item.save(function(err){
        if (err) throw err;
        else res.redirect('/hungthinh-admin/thuc-te');
    });
});

router.post('/delete',function(req,res,next){
    var id=req.body.id;
    ThucTeModel.remove({_id:id},function(err){
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
