var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var async = require('async');
var decode = require('decode-html');
var config = require('../config.js');
var CamNangSuaChuaNhaModel = require('../model/camnangsuachuanha.model');

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
        linkbar[1] = linkbar[0] + "/cam-nang/" + req.params.url;
        var url_title = '';
        switch(req.params.url) {
          case "sua-chua-nha-hop-phong-thuy":
              url_title = "Sửa chữa nhà hợp phong thủy";
              break;
          case "kinh-nghiem-sua-chua-nha":
              url_title = "Kinh nghiệm sửa chữa nhà";
              break;
          default:
              url_title = "";
              break;
        }

        req.url_title = url_title;

        var html = "<div>"
                    + '<a href=' + linkbar[0] + '>Trang chủ</a>' + "/"
                    + '<a href=' + linkbar[1] + '>'+ url_title +'</a>'
                    + '</div>';
        done(null, html);
    },
    getData: function(done) {
      CamNangSuaChuaNhaModel.aggregate([
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
                        +    '<a href="'+ config.domain + "/cam-nang/" + req.params.url +"/" + data.getData[i].url +'">'
                        +         '<img width="300" height="200" src="'+ data.getData[i].image.src +'" class="aligncenter wp-post-image" alt="'+data.getData[i].image.alt+'">'
                        +     '</a>'
                        + '</div>'
                        + '<div class="col-md-6 no-padding-left">'
                        +     '<header>'
                        +        '<h3 class="no-margin-top">'
                        +             '<a href="'+ config.domain + "/cam-nang/"+ req.params.url +"/" + data.getData[i].url +'"><h3 class="no-margin-top">'+data.getData[i].title+'</h3></a>'
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
                  +          '<a href="'+ config.domain + "/cam-nang/"+ req.params.url +"/"  + data.getData[i].url +'" class="full-image">'
                  +            '<img alt="'+ data.getData[i].image.alt + '" src="' + data.getData[i].image.src +'" style="height:100px; width: 100px" />'
                  +          '</a>'
                  +       '</div>'
                  +     '</div>'
                  +     '<div class="col-sm-10">'
                  +         '<h4 class="no-padding-top no-margin-top">'
                  +             '<a href="'+ config.domain + "/cam-nang/"+ req.params.url +"/"  + data.getData[i].url +'"><h3 class="no-padding-top no-margin-top">'+ data.getData[i].title +'</h3></a>'
                  +         '</h4>'
                  +         '<div class="col-md-12 no-padding-left">'
                  +             '<div class="entry-content">'
                  +                 '<p>'+ data.getData[i].description +'...</p>'
                  +             '</div>'
                  +         '</div>'
                  +      '</div>'
                  +   '</div>'
                  + '</div>';


              }
            }
          }
        }
        var res = {};
        res['html'] = html;
        res['html_head'] = html_head;
        var meta_description = 'Cẩm nang sửa chữa nhà cho mọi người, sửa nhà hợp phong thủy, kinh nghiệm sửa chửa, xây dựng mới, mẹo nhỏ làm căn nhà bạn chống chọi với thời gian.'
        res['meta_description'] = meta_description;
        done(null, res);
    }]
  },
  function(err, data) {
    if(err) {
      console.log(err);
    }
    res.render('CamNangSuaChuaNha/camnangsuachuanha', {
      title: req.url_title + "- Sửa chữa cải tạo Hưng Thịnh",
      linkbar: data.linkbar,
      content: data.content.html,
      content_head: data.content.html_head,
      meta_description : data.content.meta_description
    });
  })
});


router.get('/:type/:title_url', function(req, res, next) {
  async.auto({
    data: function(done) {
      var query = {};

      query['type'] = req.params.type;
      query['url'] = req.params.title_url;

      CamNangSuaChuaNhaModel.findOne(query).lean().exec(done);
    },
    linkbar: ['data', function(data, done) {
      if(data.data) {
        var domain = req.hostname;
        var protocol = req.protocol;
        var path = req.path;
        var linkbar = {};

        var url_title = "";
        switch(req.params.type) {
          case "sua-chua-nha-hop-phong-thuy":
              url_title = "Sửa chữa nhà hợp phong thủy";
              break;
          case "kinh-nghiem-sua-chua-nha":
              url_title = "Kinh nghiệm sửa chữa nhà";
              break;
          default:
              url_title = "";
              break;
        }

        console.log("Config ", config );
        linkbar[0] = config.domain;
        linkbar[1] = linkbar[0] + "/cam-nang/" + req.params.type;
        linkbar[2] = linkbar[1] + "/" + req.params.title_url;

        var first = data.data.title.substring(0,1);
        var last = data.data.title.substring(1);
        var title = first.toUpperCase() + last.toLowerCase();

        req.url_title = url_title + ' - ' + title;

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
      CamNangSuaChuaNhaModel.aggregate([ { $project : { _id: 0, "url":1, "type":1, "url": 1, "image":1, "title":1, "description": 1} }
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
                +          '<a href="'+ config.domain + "/cam-nang/"+ data.getDataFooter[i].type + "/"+ data.getDataFooter[i].url + '" class="full-image">'
                +            '<img alt="'+ data.getDataFooter[i].image.alt + '" src="' + data.getDataFooter[i].image.src +'" style="height:100px; width: 100px" />'
                +          '</a>'
                +       '</div>'
                +     '</div>'
                +     '<div class="col-sm-10">'
                +         '<h4 class="no-padding-top no-margin-top">'
                +             '<a href="'+ config.domain + "/cam-nang/"+ data.getDataFooter[i].type + "/"+ data.getDataFooter[i].url + '" class="full-image">'+ data.getDataFooter[i].title +'</a>'
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
                      + '<li><a href="'+ config.domain + "/cam-nang/"+ data.getDataFooter[i].type + "/"+ data.getDataFooter[i].url + '" class="full-image">'+ data.getDataFooter[i].title +'</a></li>'
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
      res.render('CamNangSuaChuaNha/camnangsuachuanhadetail', {
        title: req.url_title + ' - Công ty xây dựng cải tạo Hưng Thịnh',
        body: body,
        linkbar: data.linkbar,
        footer: data.footer,
        footer2: data.footer2,
        meta_description: req.url_title + ' Hưng Thịnh - công ty chuyên xây dựng nhà phố, sửa chửa nhà, cải tạo mặt bằng với giá tốt nhất'
      });
    } else {
      return;
    }

  })
});

module.exports = router;
