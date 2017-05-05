var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var async = require('async');
var DonGiaModel = require('../model/dongia.model');
var MangLuoiModel = require('../model/mangluoi.model');
var DichVuSuaChuaCaiTaoModel = require('../model/dichvusuachuacaitao.model');
var browser = require('file-manager-js');
var Busboy = require('busboy');
var path = require('path');

router.get('/home', function(req, res, next) {
  res.redirect('/');
});

var subString = function(str) {
  var res = str.substring(0, 200);
  res = res + '...';
  return res;
}

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
              +  '<a href="/don-gia/don-gia-sua-chua-cai-tao/'+dongia.url+'">'
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
            if(flag < 2) {
              dongiasuachuacaitao_html = dongiasuachuacaitao_html
                  +'<div class="blog-item col-sm-12">'
                  +    '<div class="row">'
                  +        '<div class="col-sm-3">'
                  +            '<div>'
                  +                '<a href="/don-gia/don-gia-sua-chua-cai-tao/'+dongia.url+'" class="full-image">'
                  +                    '<img width="150" height="100" src="'+dongia.image.src+'" class="aligncenter wp-post-image" alt="sua-chua-cai-tao-hung-thinh">'
                  +                '</a>'
                  +            '</div>'
                  +        '</div>'
                  +        '<div class="col-sm-9">'
                  +            '<h4 class="no-padding-top no-margin-top"><a href="/don-gia/don-gia-sua-chua-cai-tao/'+dongia.url+'">'+dongia.title+'</a></h4>'
                  +            '<div class="col-md-12 no-padding-left">'
                  +                '<div class="entry-content">'
                  +                    '<p>'+ subString(dongia.description) +'...</p>'
                  +                '</div>'
                  +            '</div>'
                  +        '</div>'
                  +    '</div>'
                  +'</div>'
                  +'<div class="distance-10"></div>';
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
      var flag = 0;
      dongias.forEach(function(dongia, index, arr) {
        if(dongia.type === 'don-gia-xay-dung-moi'){
          if(dongiaxaydungmoi_html === '') {
            dongiaxaydungmoi_html = dongiaxaydungmoi_html
              +'<div class="col-md-6">'
              +  '<a href="/don-gia/don-gia-xay-dung-moi/'+dongia.url+'">'
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
            if(flag < 2) {
              dongiaxaydungmoi_html = dongiaxaydungmoi_html
                  +'<div class="blog-item col-sm-12">'
                  +    '<div class="row">'
                  +        '<div class="col-sm-3">'
                  +            '<div>'
                  +                '<a href="/don-gia/don-gia-xay-dung-moi/'+dongia.url+'" class="full-image">'
                  +                    '<img width="150" height="100" src="'+dongia.image.src+'" class="aligncenter wp-post-image" alt="sua-chua-cai-tao-hung-thinh">'
                  +                '</a>'
                  +            '</div>'
                  +        '</div>'
                  +        '<div class="col-sm-9">'
                  +            '<h4 class="no-padding-top no-margin-top"><a href="/don-gia/don-gia-xay-dung-moi/'+dongia.url+'">'+dongia.title+'</a></h4>'
                  +            '<div class="col-md-12 no-padding-left">'
                  +                '<div class="entry-content">'
                  +                    '<p>'+subString(dongia.description)+'...</p>'
                  +                '</div>'
                  +            '</div>'
                  +        '</div>'
                  +    '</div>'
                  +'</div>'
                  +'<div class="clearfix"></div>'
                  +'<div class="distance-10"></div>';
                  flag++;
                }
          }
        }
      });

      done(null, dongiaxaydungmoi_html);
    }],
    mangluoihoatdong_data: function(done) {
      MangLuoiModel.find().lean().exec(done);
    },
    mangluoihoatdong: ['mangluoihoatdong_data', function(data, done) {
      var mangluois = data.mangluoihoatdong_data;
      var mangluoihoatdong_html = '';
      var flag = 0;
      mangluois.forEach(function(mangluoi, index, arr) {
        if(mangluoihoatdong_html === '') {
          mangluoihoatdong_html = mangluoihoatdong_html
            +'<div class="col-md-6">'
            +  '<a href="/mang-luoi/'+mangluoi.url+'">'
            +      '<img width="300" height="200" src="'+mangluoi.image.src+'" class="aligncenter wp-post-image" alt="sua-chua-cai-tao-hung-thinh">'
            +  '</a>'
            +'</div>'
            +'<div class="col-md-6 no-padding-left">'
            +  '<header>'
            +     '<h3 class="no-margin-top">'
            +         '<a href="/mang-luoi/'+mangluoi.url+'">'+mangluoi.title+'</a>'
            +     '</h3>'
            +  '</header>'
            +  '<div>'
            +      '<div class="entry-content">'
            +          '<p>'+mangluoi.description+'...</p>'
            +      '</div>'
            +  '</div>'
            +'</div>'
            +'<div class="clearfix"></div>'
            +'<div class="distance-10"></div>'
        }
        else {
          if(flag < 2) {
            mangluoihoatdong_html = mangluoihoatdong_html
                +'<div class="blog-item col-sm-12">'
                +    '<div class="row">'
                +        '<div class="col-sm-3">'
                +            '<div>'
                +                '<a href="/mang-luoi/'+mangluoi.url+'" class="full-image">'
                +                    '<img width="150" height="100" src="'+mangluoi.image.src+'" class="aligncenter wp-post-image" alt="sua-chua-cai-tao-hung-thinh">'
                +                '</a>'
                +            '</div>'
                +        '</div>'
                +        '<div class="col-sm-9">'
                +            '<h4 class="no-padding-top no-margin-top"><a href="/mang-luoi/'+mangluoi.url+'">'+mangluoi.title+'</a></h4>'
                +            '<div class="col-md-12 no-padding-left">'
                +                '<div class="entry-content">'
                +                    '<p>'+subString(mangluoi.description)+'...</p>'
                +                '</div>'
                +            '</div>'
                +        '</div>'
                +    '</div>'
                +'</div>'
                +'<div class="clearfix"></div>'
                +'<div class="distance-10"></div>';
                flag++;
              }
        }
      });

      done(null, mangluoihoatdong_html);
    }],
    dichvusuachuacaitao_data: function(done) {
      DichVuSuaChuaCaiTaoModel.find().lean().exec(done);
    },
    dichvusuachuacaitao: ['dichvusuachuacaitao_data', function(data, done) {
      var dichvus = data.dichvusuachuacaitao_data;
      var dichvusuachuacaitao_html = '';
      var flag = 0;
      dichvus.forEach(function(dichvu, index, arr) {
        if(dichvusuachuacaitao_html === '') {
          dichvusuachuacaitao_html = dichvusuachuacaitao_html
            +'<div class="col-md-6">'
            +  '<a href="/dich-vu/'+dichvu.type+"/" +dichvu.url+'">'
            +      '<img width="300" height="200" src="'+dichvu.image.src+'" class="aligncenter wp-post-image" alt="sua-chua-cai-tao-hung-thinh">'
            +  '</a>'
            +'</div>'
            +'<div class="col-md-6 no-padding-left">'
            +  '<header>'
            +     '<h3 class="no-margin-top">'
            +         '<a href="/dich-vu/'+dichvu.type+"/" +dichvu.url+'">'+dichvu.title+'</a>'
            +     '</h3>'
            +  '</header>'
            +  '<div>'
            +      '<div class="entry-content">'
            +          '<p>'+dichvu.description+'...</p>'
            +      '</div>'
            +  '</div>'
            +'</div>'
            +'<div class="clearfix"></div>'
            +'<div class="distance-10"></div>'
        }
        else {
          if(flag < 2) {
            dichvusuachuacaitao_html = dichvusuachuacaitao_html
                +'<div class="blog-item col-sm-12">'
                +    '<div class="row">'
                +        '<div class="col-sm-3">'
                +            '<div>'
                +                '<a href="/dich-vu/'+dichvu.type+"/" +dichvu.url+'" class="full-image">'
                +                    '<img width="150" height="100" src="'+dichvu.image.src+'" class="aligncenter wp-post-image" alt="sua-chua-cai-tao-hung-thinh">'
                +                '</a>'
                +            '</div>'
                +        '</div>'
                +        '<div class="col-sm-8">'
                +            '<h4 class="no-padding-top no-margin-top"><a href="/dich-vu/'+dichvu.type+"/" +dichvu.url+'">'+dichvu.title+'</a></h4>'
                +            '<div class="col-md-12 no-padding-left">'
                +                '<div class="entry-content">'
                +                    '<p>'+subString(dichvu.description)+'...</p>'
                +                '</div>'
                +            '</div>'
                +        '</div>'
                +    '</div>'
                +'</div>'
                +'<div class="clearfix"></div>'
                +'<div class="distance-10"></div>'
                flag++;
          }
        }
      });

      done(null, dichvusuachuacaitao_html);
    }]
  }, function(err, data) {
    if(err) {
      console.log(err);
      res.render('Home/homepage', {
        dongiasuachuacaitao: data.dongiasuachuacaitao,
        dongiaxaydungmoi: data.dongiaxaydungmoi,
        mangluoihoatdong: data.mangluoihoatdong,
        dichvusuachuacaitao: data.dichvusuachuacaitao
      });
    }

    console.log("data - don gia: ", data);
    res.render('Home/homepage', {
      title: "Sửa chữa cải tạo Hưng Thịnh chuyên sửa chửa, cải tạo, xây dựng mới tại các quận Hồ Chí Minh",
      dongiasuachuacaitao: data.dongiasuachuacaitao,
      dongiaxaydungmoi: data.dongiaxaydungmoi,
      mangluoihoatdong: data.mangluoihoatdong,
      dichvusuachuacaitao: data.dichvusuachuacaitao
    });

  });
});

router.post('/uploader1/upload', function(req, res) {
  var fs = require('fs');

  var urlImage = '';

  var busboy = new Busboy({
    headers: req.headers
  });

  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    var d = new Date();
    var n = d.getTime().toString();
    urlImage = n + filename;
    console.log("Url image: ", urlImage);
    console.log("process.env.PWD: ", process.env.PWD);
    file.pipe(fs.createWriteStream(path.join(process.env.PWD, 'public/images', urlImage)));
  });

  busboy.on('finish', function() {
    html = "";
   html += "<script type='text/javascript'>";
   html += "    var funcNum = " + req.query.CKEditorFuncNum + ";";
   html += "    var url     = \"/images/" + urlImage + "\";";
   html += "    var message = \"Uploaded file successfully\";";
   html += "";
   html += "    window.parent.CKEDITOR.tools.callFunction(funcNum, url, message);";
   html += "</script>";
    res.send(html);
  });
  req.pipe(busboy);
});

module.exports = router;
