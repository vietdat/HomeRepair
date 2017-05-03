var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var async = require('async');
var decode = require('decode-html');
var config = require('../config.js');
var ThucTeModel = require('../model/thucte.model');

router.get('/', function(req, res, next) {
  async.auto({
    thuctedata:function(done) {
      ThucTeModel.find().lean().exec(done);
    },
    dathicong: ['thuctedata',function(data, done) {
      var flag = 0;
      var dathuchien_html = '';
      data.thuctedata.forEach(function(congtrinh, index, arr) {
        if(congtrinh.type  === 'da-thi-cong') {
          if(dathuchien_html === '') {
            dathuchien_html = dathuchien_html
              +'<div class="col-md-6">'
              +  '<a href="/thuc-te/da-thi-cong/'+congtrinh.url+'">'
              +      '<img width="300" height="200" src="'+congtrinh.image.src+'" class="aligncenter wp-post-image" alt="sua-chua-cai-tao-hung-thinh">'
              +  '</a>'
              +'</div>'
              +'<div class="col-md-6 no-padding-left">'
              +  '<div>'
              +      '<div class="entry-content">'
              +          '<p>'+congtrinh.description+'...</p>'
              +      '</div>'
              +  '</div>'
              +'</div>'
              +'<div class="clearfix"></div>'
              +'<div class="distance-10"></div>'
            }
          else {
            if(flag < 2) {
              dathuchien_html = dathuchien_html
                  +'<div class="blog-item col-sm-6">'
                  +    '<div class="row">'
                  +        '<div class="col-sm-4">'
                  +            '<div>'
                  +                '<a href="/thuc-te/da-thi-cong/'+congtrinh.url+'" class="full-image">'
                  +                    '<img width="100" height="100" src="'+congtrinh.image.src+'" class="aligncenter wp-post-image" alt="sua-chua-cai-tao-hung-thinh">'
                  +                '</a>'
                  +            '</div>'
                  +        '</div>'
                  +        '<div class="col-sm-8">'
                  +            '<h4 class="no-padding-top no-margin-top"><a href="/thuc-te/da-thi-cong/'+congtrinh.url+'">'+congtrinh.title+'</a></h4>'
                  +            '<div class="col-md-12 no-padding-left">'
                  +                '<div class="entry-content">'
                  +                    '<p>'+congtrinh.description+'...</p>'
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

      done(null, dathuchien_html);
    }],
    dangthicong: ['thuctedata',function(data, done) {
      var flag = 0;
      var dangthuchien_html = '';

      data.thuctedata.forEach(function(congtrinh, index, arr) {
        if(congtrinh.type  === 'dang-thi-cong') {
          if(dangthuchien_html === '') {
            dangthuchien_html = dangthuchien_html
              +'<div class="col-md-6">'
              +  '<a href="/thuc-te/dang-thi-cong/'+congtrinh.url+'">'
              +      '<img width="300" height="200" src="'+congtrinh.image.src+'" class="aligncenter wp-post-image" alt="sua-chua-cai-tao-hung-thinh">'
              +  '</a>'
              +'</div>'
              +'<div class="col-md-6 no-padding-left">'
              +  '<div>'
              +      '<div class="entry-content">'
              +          '<p>'+congtrinh.description+'...</p>'
              +      '</div>'
              +  '</div>'
              +'</div>'
              +'<div class="clearfix"></div>'
              +'<div class="distance-10"></div>'
            }
          else {
            if(flag < 2) {
              dangthuchien_html = dangthuchien_html
                  +'<div class="blog-item col-sm-6">'
                  +    '<div class="row">'
                  +        '<div class="col-sm-4">'
                  +            '<div>'
                  +                '<a href="/thuc-te/dang-thi-cong/'+congtrinh.url+'" class="full-image">'
                  +                    '<img width="100" height="100" src="'+congtrinh.image.src+'" class="aligncenter wp-post-image" alt="sua-chua-cai-tao-hung-thinh">'
                  +                '</a>'
                  +            '</div>'
                  +        '</div>'
                  +        '<div class="col-sm-8">'
                  +            '<h4 class="no-padding-top no-margin-top"><a href="/thuc-te/dang-thi-cong/'+congtrinh.url+'">'+congtrinh.title+'</a></h4>'
                  +            '<div class="col-md-12 no-padding-left">'
                  +                '<div class="entry-content">'
                  +                    '<p>'+congtrinh.description+'...</p>'
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
      done(null, dangthuchien_html);
    }]
  }, function(err, data) {
    if(err) {
      console.log(err);
      res.render('ThucTe/thucte', {
        dathicong: data.dathicong,
        dangthicong: data.dangthicong
      });
    }
    res.render('ThucTe/thucte', {
      dathicong: data.dathicong,
      dangthicong: data.dangthicong
    });
  });
});

router.get('/:url', function(req, res, next) {
  async.auto({
    linkbar:function(done) {
        var path = req.path;
        var linkbar = {};

        if(!req.params.url || req.params.url === "") {
          console.log("Missing url");
          var err = new Error('Not Found');
          err.status = 404;
          next(err);
        }

        console.log("Config ", config );
        linkbar[0] = config.domain;
        linkbar[1] = linkbar[0] + "/thuc-te/" + req.params.url;
        var url_title = '';
        switch(req.params.url) {
          case "da-thi-cong":
              url_title = "Công trình đã thi công";
              break;
          case "dang-thi-cong":
              url_title = "Công trình đang thi công";
              break;
          default:
              url_title = "";
              break;
        }

        console.log("Url title", url_title);

        var html = "<div>"
                    + '<a href=' + linkbar[0] + '>Trang chủ</a>' + "/"
                    + '<a href=' + linkbar[1] + '>'+ url_title +'</a>'
                    + '</div>';
        done(null, html);
    },
    getData: function(done) {
      ThucTeModel.aggregate([
          { $match : {type : req.params.url}},
          { $project : { _id: 0, "url":1, "image":1, "title":1, "description": 1} }
              ]).exec(done);
    },
    content: ['getData', function(data, done) {
      var html = '';
      var html_head = '';

      if(data) {
          if( data.getData ) {
            var length = -1;
            if(data.getData.length > 10) {
              length = 10;
            } else {
              length = data.getData.length;
            }
            var link = config.domain;

            for(var i = 0; i < length; i++) {
              if(i === 0) {
                html_head = html_head
                        + '<div class="col-md-6">'
                        +    '<a href="'+ config.domain + "/thuc-te/" + req.params.url +"/" + data.getData[i].url +'">'
                        +         '<img width="300" height="200" src="'+ data.getData[i].image.src +'" class="aligncenter wp-post-image" alt="'+data.getData[i].image.alt+'">'
                        +     '</a>'
                        + '</div>'
                        + '<div class="col-md-6 no-padding-left">'
                        +     '<header>'
                        +        '<h3 class="no-margin-top">'
                        +             '<a href="'+ config.domain + "/thuc-te/"+ req.params.url +"/" + data.getData[i].url +'"><h3 class="no-margin-top">'+data.getData[i].title+'</h3></a>'
                        +         '</h3>'
                        +     '</header>'
                        +     '<div>'
                        +         '<div class="entry-content">'
                        +             '<p>'+ data.getData[i].description +'...</p>'
                        +         '</div>'
                        +     '</div>'
                        +  '</div>'
              }
              else {
                html = html
                + '<div class="col-sm-12 margin-buttom-10 no-padding-left">'
                +    '<div class="row">'
                +     '<div class="col-sm-2">'
                +       '<div>'
                +          '<a href="'+ config.domain + "/thuc-te/"+ req.params.url +"/"  + data.getData[i].url +'" class="full-image">'
                +            '<img alt="'+ data.getData[i].image.alt + '" src="' + data.getData[i].image.src +'" style="height:100px; width: 100px" />'
                +          '</a>'
                +       '</div>'
                +     '</div>'
                +     '<div class="col-sm-10">'
                +         '<h4 class="no-padding-top no-margin-top">'
                +             '<a href="'+ config.domain + "/thuc-te/"+ req.params.url +"/"  + data.getData[i].url +'"><h3 class="no-padding-top no-margin-top">'+ data.getData[i].title +'</h3></a>'
                +         '</h4>'
                +         '<div class="col-md-12 no-padding-left">'
                +             '<div class="entry-content">'
                +                 '<p>'+ data.getData[i].description +'...</p>'
                +             '</div>'
                +         '</div>'
                +      '</div>'
                +   '</div>'
                + '</div>'
              }
            }
          }
        }
        var res = {};
        res['html'] = html;
        res['html_head'] = html_head;
        console.log("res ", res);
        done(null, res);
    }]
  },
  function(err, data) {
    if(err) {
      console.log(err);
    }
    res.render('ThucTe/congtrinh', {
      title: "Hình ảnh thực tế các công trình đã thi công - dịch vụ xây dựng mới, sửa chữa cải tạo Hưng Thịnh",
      linkbar: data.linkbar,
      content: data.content.html,
      content_head: data.content.html_head
    });
  })
});

router.get('/:type/:title_url', function(req, res, next) {
  async.auto({
    data: function(done) {
      var query = {};

      query['type'] = req.params.type;
      query['url'] = req.params.title_url;

      ThucTeModel.findOne(query).lean().exec(done);
    },
    linkbar: ['data', function(data, done) {
      if(data.data) {
        var domain = req.hostname;
        var protocol = req.protocol;
        var path = req.path;
        var linkbar = {};

        var url_title = "";
        switch(req.params.type) {
          case "da-thi-cong":
              url_title = "Công trình đã thi công";
              break;
          case "dang-thi-cong":
              url_title = "Công trình đang thi công";
              break;
          default:
              url_title = "";
              break;
        }

        console.log("Config ", config );
        linkbar[0] = config.domain;
        linkbar[1] = linkbar[0] + "/thuc-te/" + req.params.type;
        linkbar[2] = linkbar[1] + "/" + req.params.title_url;

        var first = data.data.title.substring(0,1);
        var last = data.data.title.substring(1);
        var title = first.toUpperCase() + last.toLowerCase();

        req.url_title = title;
        var html = "<div>"
                    + '<a href=' + linkbar[0] + '>Trang chủ</a>' + "/"
                    + '<a href=' + linkbar[1] + '>'+ url_title +'</a>' + "/"
                    + '<a href=' + linkbar[2] + '>' + title +'</a>'
                    + '</div>';
        done(null, html);
      } else {
        done();
      }
    }],
    getDataFooter: function(done) {
      ThucTeModel.aggregate([ { $project : { _id: 0, "url":1, "image":1, "title":1, "description": 1} }
              ]).exec(done);
    },
    footer: ['getDataFooter', function(data, done) {
      if(data) {
          var html = '';
          if( data.getDataFooter) {
            console.log(data.getDataFooter);
            var length = -1;
            if(data.getDataFooter.length > 4) {
              length = 4;
            } else {
              length = data.getDataFooter.length;
            }

            for(var i = 0; i < length; i++) {
              html = html
                + '<div class="col-sm-12 margin-buttom-10 no-padding-left">'
                +    '<div class="row">'
                +     '<div class="col-sm-2">'
                +       '<div>'
                +          '<a href="'+ config.domain + "/thuc-te/"+ req.params.type + "/"+ req.params.title_url + '" class="full-image">'
                +            '<img alt="'+ data.getDataFooter[i].image.alt + '" src="' + data.getDataFooter[i].image.src +'" style="height:100px; width: 100px" />'
                +          '</a>'
                +       '</div>'
                +     '</div>'
                +     '<div class="col-sm-10">'
                +         '<h4 class="no-padding-top no-margin-top">'
                +             '<a href="'+ config.domain + "/thuc-te/"+ req.params.type + "/"+ req.params.title_url + '">'+ data.getDataFooter[i].title +'</a>'
                +         '</h4>'
                +         '<div class="col-md-12 no-padding-left">'
                +             '<div class="entry-content">'
                +                 '<p>'+ data.getDataFooter[i].description +'</p>'
                +             '</div>'
                +         '</div>'
                +      '</div>'
                +   '</div>'
                + '</div>'
              }
            }
          }
      done(null, html);
    }],
    footer2: ['getDataFooter', function(data, done) {
      if(data) {
          var length = -1;
          var html =  '<h4 style="margin:0">'
                    +     '<a href="'+ config.domain +'">Sửa chữa cải tạo Hưng Thịnh</a>'
                    + '</h4>'
                    + '<hr style="height: 1px; border-top-color: #000; margin:0">';

          html = html + '<ul>';

          if( data.getDataFooter) {

            if(data.getDataFooter.length > 6) {
              length = 6;
            } else {
              length = data.getDataFooter.length;
            }

            for(var i = 0; i < length; i++) {
              html = html
                      + '<li><a href="#">'+ data.getDataFooter[i].title +'</a></li>'
            }
          }

          html = html + '</ul>';
        }
      done(null, html);
    }],

  },
  function(err, data) {
    if(err) {
      console.log(err);
    }
    if(data.data) {
      var body = decode(data.data.content);
      res.render('ThucTe/congtrinhdetail', {
        title: req,url_title + " - Hình ảnh xây dựng mới, sửa chữa cải tạo tại các công trình tại Hồ Chí Minh",
        body: body,
        linkbar: data.linkbar,
        footer: data.footer,
        footer2: data.footer2
      });
    } else {
      return;
    }

  })
});


module.exports = router;
