var express                         = require('express');
var router                          = express.Router();
var DonGiaModel        = require('../../model/dongia.model');
var decode                          = require('decode-html');


router.get('/', function(req, res, next) {
    DonGiaModel.find(function(err, data){
        if (err) throw err;
        else{
            data.forEach(function(element) {
                element.content=decode(element.content);
            }, this);
            res.locals.data=data;
            res.render('Admin/dongia', {layout:'Admin/layout'});
        }
    })
});

router.post('/add',function(req,res,next){
    console.log(req.body);

    if(req.body.url && req.body.url==="") {
        console.log("Missing url");
        return;
    }

    if(req.body.title && req.body.title === "") {
        console.log("Missing title");
        return;
    }

    if(req.body.content && req.body.content === "") {
        console.log("Missing content");
        return;
    }

    if(req.body.alt && req.body.altImage === "") {
        console.log("Missing altImage");
        return;
    }

    if(req.body.urlImage && req.body.urlImage === "") {
        console.log("Missing urlImage");
        return;
    }

    if(req.body.description && req.body.description === "") {
        console.log("Missing description");
        return;
    }

    if(req.body.type && req.body.type === "") {
        console.log("Missing type");
        return;
    }

    var item = new DonGiaModel({
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
        else res.redirect('/hungthinh-admin/don-gia');
    });
});

router.post('/delete',function(req,res,next){
    var id=req.body.id;
    DonGiaModel.remove({_id:id},function(err){
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
