var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var async = require('async');
var DonGiaModel = require('../model/dongia.model');


router.get('/home', function(req, res, next) {
  res.render('Home/homepage', {
  	title: "Sửa chữa cải tạo Hưng Thịnh",
  	body: "body"
  });
});

router.get('/', function(req, res, next) {
  async.auto({
    dongia:function(done) {
      DonGiaModel.find().lean().exec(done);
    },
    dongiasuachuacaitao: ['dongia',function(data, done) {
      var dongias = data.dongia;
      var flag = 0;
      var dongiasuachuacaitao_html = '';
      dongias.forEach(function(dongia, index, arr) {
        if(dongia.type === 'don-gia-sua-chua-cai-tao'){
          if(dongiasuachuacaitao_html === '') {
            dongiasuachuacaitao_html = dongiasuachuacaitao_html
              +'<div class="col-md-6">'
              +  '<a href="'+dongia.url+'">'
              +      '<img width="300" height="200" src="'+dongia.image.src+'" class="aligncenter wp-post-image" alt="sua-chua-cai-tao-hung-thinh">'
              +  '</a>'
              +'</div>'
              +'<div class="col-md-6 no-padding-left">'
              +  '<div>'
              +      '<div class="entry-content">'
              +          '<p>'+dongia.description+'...</p>'
              +      '</div>'
              +  '</div>'
              +'</div>'
              +'<div class="clearfix"></div>'
              +'<div class="distance-10"></div>'
          }
          else {
            if(flag < 4) {
              dongiasuachuacaitao_html = dongiasuachuacaitao_html
                  +'<div class="blog-item col-sm-6">'
                  +    '<div class="row">'
                  +        '<div class="col-sm-4">'
                  +            '<div>'
                  +                '<a href="'+dongia.url+'" class="full-image">'
                  +                    '<img width="100" height="100" src="'+dongia.image.src+'" class="aligncenter wp-post-image" alt="sua-chua-cai-tao-hung-thinh">'
                  +                '</a>'
                  +            '</div>'
                  +        '</div>'
                  +        '<div class="col-sm-8">'
                  +            '<h4 class="no-padding-top no-margin-top"><a href="'+dongia.url+'">'+dongia.title+'</a></h4>'
                  +            '<div class="col-md-12 no-padding-left">'
                  +                '<div class="entry-content">'
                  +                    '<p>'+dongia.description+'...</p>'
                  +                '</div>'
                  +            '</div>'
                  +        '</div>'
                  +    '</div>'
                  +'</div>';
              flag++;
            }

          }
        }
      });

      done(null, dongiasuachuacaitao_html);
    }],
    dongiaxaydungmoi:['dongia',function(data, done) {
      var dongias = data.dongia;
      var dongiaxaydungmoi_html = '';
      dongias.forEach(function(dongia, index, arr) {
        if(dongia.type === 'don-gia-xay-dung-moi'){
          if(dongiaxaydungmoi_html === '') {
            dongiaxaydungmoi_html = dongiaxaydungmoi_html
              +'<div class="col-md-6">'
              +  '<a href="'+dongia.url+'">'
              +      '<img width="300" height="200" src="'+dongia.image.src+'" class="aligncenter wp-post-image" alt="sua-chua-cai-tao-hung-thinh">'
              +  '</a>'
              +'</div>'
              +'<div class="col-md-6 no-padding-left">'
              +  '<div>'
              +      '<div class="entry-content">'
              +          '<p>'+dongia.description+'...</p>'
              +      '</div>'
              +  '</div>'
              +'</div>'
              +'<div class="clearfix"></div>'
              +'<div class="distance-10"></div>'
          }
          else {
            dongiaxaydungmoi_html = dongiaxaydungmoi_html
                +'<div class="blog-item col-sm-6">'
                +    '<div class="row">'
                +        '<div class="col-sm-4">'
                +            '<div>'
                +                '<a href="'+dongia.url+'" class="full-image">'
                +                    '<img width="100" height="100" src="'+dongia.image.src+'" class="aligncenter wp-post-image" alt="sua-chua-cai-tao-hung-thinh">'
                +                '</a>'
                +            '</div>'
                +        '</div>'
                +        '<div class="col-sm-8">'
                +            '<h4 class="no-padding-top no-margin-top"><a href="'+dongia.url+'">'+dongia.title+'</a></h4>'
                +            '<div class="col-md-12 no-padding-left">'
                +                '<div class="entry-content">'
                +                    '<p>'+dongia.description+'...</p>'
                +                '</div>'
                +            '</div>'
                +        '</div>'
                +    '</div>'
                +'</div>';
          }
        }
      });

      done(null, dongiaxaydungmoi_html);
    }]
  }, function(err, data) {
    if(err) {
      console.log(err);
      res.render('Home/homepage', {
        dongiasuachuacaitao: data.dongiasuachuacaitao,
        dongiaxaydungmoi: data.dongiaxaydungmoi
      });
    }

    console.log("data - don gia: ", data);
    res.render('Home/homepage', {
      dongiasuachuacaitao: data.dongiasuachuacaitao,
      dongiaxaydungmoi: data.dongiaxaydungmoi
    });

  });
});

module.exports = router;
