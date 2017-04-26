var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var async = require('async');
var decode = require('decode-html');
var config = require('../config.js');
var GioiThieuModel = require('../model/gioithieu.model');

router.get('/', function(req, res, next) {
  async.auto({
    linkbar:function(done) {
        var path = req.path;
        var linkbar = {};

        console.log("Config ", config );
        linkbar[0] = config.domain;
        linkbar[1] = linkbar[0] + "/gioi-thieu";

        var html = "<div>"
                    + '<a href=' + linkbar[0] + '>Trang chủ</a>' + "/"
                    + '<a href=' + linkbar[1] + '>Giới thiệu</a>'
                    + '</div>';
        done(null, html);
    },
    getData: function(done) {
      GioiThieuModel.aggregate([ { $project : { _id: 0, "url":1, "image":1, "title":1, "description": 1} }
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
              if(data.getData[i].url === 'sua-chua-cai-tao-hung-thinh') {
                html_head = html_head
                        + '<div class="col-md-3">'
                        +    '<a href="'+ config.domain + "/gioi-thieu/" + data.getData[i].url +'">'
                        +         '<img width="150" height="150" src="'+ data.getData[i].image.src +'" class="aligncenter wp-post-image" alt="'+data.getData[i].image.alt+'">'
                        +     '</a>'
                        + '</div>'
                        + '<div class="col-md-9 no-padding-left">'
                        +     '<header>'
                        +        '<h3 class="no-margin-top">'
                        +             '<a href="'+ config.domain + "/gioi-thieu/" + data.getData[i].url +'"><h3>'+data.getData[i].title+'</h3></a>'
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
                +     '<div class="col-sm-3">'
                +       '<div>'
                +          '<a href="'+ config.domain + "/gioi-thieu/" + data.getData[i].url +'" class="full-image">'
                +            '<img alt="'+ data.getData[i].image.alt + '" src="' + data.getData[i].image.src +'" style="height:100px; width: 100px" />'
                +          '</a>'
                +       '</div>'
                +     '</div>'
                +     '<div class="col-sm-9">'
                +         '<h4 class="no-padding-top no-margin-top">'
                +             '<a href="'+ config.domain + "/gioi-thieu/" + data.getData[i].url +'"><h3 class="no-padding-top no-margin-top">'+ data.getData[i].title +'</h3></a>'
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
    res.render('GioiThieu/gioithieu', {
      title: "Sửa chữa cải tạo Hưng Thịnh",
      linkbar: data.linkbar,
      content: data.content.html,
      content_head: data.content.html_head
    });
  })
});


router.get('/:url', function(req, res, next) {
  async.auto({
    data: function(done) {
      var query = {};

      query['url'] = req.params.url;

      GioiThieuModel.findOne(query).lean().exec(done);
    },
    linkbar: ['data', function(data, done) {
      if(data.data) {
        var domain = req.hostname;
        var protocol = req.protocol;
        var path = req.path;
        var linkbar = {};

        console.log("Config ", config );
        linkbar[0] = config.domain;
        linkbar[1] = linkbar[0] + "/gioi-thieu";
        linkbar[2] = linkbar[1] + "/" + req.params.url;

        var first = data.data.title.substring(0,1);
        var last = data.data.title.substring(1);
        var title = first.toUpperCase() + last.toLowerCase();

        var html = "<div>"
                    + '<a href=' + linkbar[0] + '>Trang chủ</a>' + "/"
                    + '<a href=' + linkbar[1] + '>Giới thiệu</a>' + "/"
                    + '<a href=' + linkbar[2] + '>' + title +'</a>'
                    + '</div>';
        done(null, html);
      } else {
        done();
      }
    }],
    getDataFooter: function(done) {
      GioiThieuModel.aggregate([ { $project : { _id: 0, "url":1, "image":1, "title":1, "description": 1} }
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
                +          '<a href="'+ config.domain + "/gioi-thieu/"+ data.getDataFooter[i].url + '" class="full-image">'
                +            '<img alt="'+ data.getDataFooter[i].image.alt + '" src="' + data.getDataFooter[i].image.src +'" style="height:100px; width: 100px" />'
                +          '</a>'
                +       '</div>'
                +     '</div>'
                +     '<div class="col-sm-10">'
                +         '<h4 class="no-padding-top no-margin-top">'
                +             '<a href="'+ config.domain +"/gioi-thieu/"+ data.getDataFooter[i].url + '">'+ data.getDataFooter[i].title +'</a>'
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
                + '<li><a href="'+ config.domain + "/gioi-thieu/" + data.getDataFooter[i].url + '">'+ data.getDataFooter[i].title +'</a></li>'
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
      res.render('GioiThieu/suachuacaitaoquan', {
        title: "Sửa chữa cải tạo Hưng Thịnh",
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
