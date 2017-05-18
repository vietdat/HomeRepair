var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var async = require('async');
var decode = require('decode-html');
var config = require('../config.js');
var MangLuoiModel = require('../model/mangluoi.model');

router.get('/', function(req, res, next) {
  async.auto({
      linkbar: function(done) {
        var path = req.path;
        var linkbar = {};

        console.log("Config ", config);
        linkbar[0] = config.domain;
        linkbar[1] = linkbar[0] + "/mang-luoi";

        var html = "<div>" +
          '<a href=' + linkbar[0] + '>Trang chủ</a>' + "/" +
          '<a href=' + linkbar[1] + '>Mạng lưới</a>' +
          '</div>';
        done(null, html);
      },
      checkPage: function(done) {
        var query = {};
        MangLuoiModel.count(query, done);
      },
      getData: function(done) {
        var to = req.query.page_size * 10;
        var from = (req.query.page_size - 1) * 10;
        MangLuoiModel.find().skip(from).limit(to).exec(done);
      },
      content: ['checkPage', 'getData', function(data, done) {
        var html = '';
        var html_head = '';

        if (data) {
          if (data.getData) {
            var length = -1;
            if (data.getData.length > 10) {
              length = 10;
            } else {
              length = data.getData.length;
            }
            var link = config.domain;

            for (var i = 0; i < length; i++) {
              if (i === 0) {
                html_head = html_head +
                  '<div class="col-md-3">' +
                  '<a href="' + config.domain + "/mang-luoi/" + data.getData[i].url + '">' +
                  '<img width="150" height="150" src="' + data.getData[i].image.src + '" class="aligncenter wp-post-image" alt="' + data.getData[i].image.alt + '">' +
                  '</a>' +
                  '</div>' +
                  '<div class="col-md-9 no-padding-left">' +
                  '<header>' +
                  '<h3 class="no-margin-top">' +
                  '<a href="' + config.domain + "/mang-luoi/" + data.getData[i].url + '"><h3>' + data.getData[i].title + '</h3></a>' +
                  '</h3>' +
                  '</header>' +
                  '<div>' +
                  '<div class="entry-content">' +
                  '<p>' + data.getData[i].description + '...</p>' +
                  '</div>' +
                  '</div>' +
                  '</div>'
              } else {
                html = html +
                  '<div class="col-sm-12 margin-buttom-10 no-padding-left">' +
                  '<div class="row">' +
                  '<div class="col-sm-2">' +
                  '<div>' +
                  '<a href="' + config.domain + "/mang-luoi/" + data.getData[i].url + '" class="full-image">' +
                  '<img alt="' + data.getData[i].image.alt + '" src="' + data.getData[i].image.src + '" style="height:100px; width: 100px" />' +
                  '</a>' +
                  '</div>' +
                  '</div>' +
                  '<div class="col-sm-10">' +
                  '<h4 class="no-padding-top no-margin-top">' +
                  '<a href="' + config.domain + "/mang-luoi/" + data.getData[i].url + '"><h3 class="no-padding-top no-margin-top">' + data.getData[i].title + '</h3></a>' +
                  '</h4>' +
                  '<div class="col-md-12 no-padding-left">' +
                  '<div class="entry-content">' +
                  '<p>' + data.getData[i].description + '...</p>' +
                  '</div>' +
                  '</div>' +
                  '</div>' +
                  '</div>' +
                  '</div>'
              }
            }
          }
        }

        var numOfPage = Math.floor(data.checkPage / 10) + 1;

        if (numOfPage > 1) {
          html = html + '<ul class="pagination right">';

          for (var i = 0; i < numOfPage; i++) {
            if(!req.query.page_size) {
              if(i==0) {
                html = html + '<li><a style="background-color: #ccc;" href="/mang-luoi?page_size=' + (i +1) + '">' + (i + 1) + '</a></li>'
              } else {
                html = html + '<li><a href="/mang-luoi?page_size=' + (i +1) + '">' + (i + 1) + '</a></li>'
              }
            } else {
              if(req.query.page_size == i+1) {
                html = html + '<li><a style="background-color: #ccc;" href="/mang-luoi?page_size=' + (i + 1) + '">' + (i + 1) + '</a></li>'
              } else {
                html = html + '<li><a href="/mang-luoi?page_size=' + (i + 1) + '">' + (i + 1) + '</a></li>'
              }
            }
          }
          html = html + '</ul>';
        }

        var res = {};
        res['html'] = html;
        res['html_head'] = html_head;
        console.log("res ", res);
        done(null, res);
      }],
      social: ['content', function(data, done) {
        var social = '';
        var meta = '';

        social = social +
          '<div class="social">' +
          '<span class="Facebook">' +
          '<div class="fb-like" data-href="' + config.domain + '/mang-luoi/' + '' + '" data-layout="button_count" data-action="like" data-size="small" data-show-faces="true" data-share="true"></div>' +
          '</span>' +
          '<span class="google">' +
          '<div class="g-plusone" data-size="medium" data-annotation="inline" data-width="300"></div>' +
          '</span>' +
          '</div>';

        meta = meta +
          '<meta property="og:url" content="http://xaydungcaitao.com/"/>' +
          '<meta property="og:type" content="website" />' +
          '<meta property="og:title" content= "' + req.url_title + '"- Sửa chữa cải tạo Hưng Thịnh"/>' +
          '<meta property="og:description" content="Trang thông tin, kĩ thuật những lưu ý,mẹo nhỏ trong sửa chữa cải tạo" />' +
          '<meta property="og:image" content="http://xaydungcaitao.com/images/1493077256560la_kinh.jpg" />'

        var result = {};

        result['social'] = social;
        result['meta'] = meta;

        done(null, result);
      }]
    },
    function(err, data) {
      if (err) {
        console.log(err);
      }
      res.render('MangLuoi/mangluoi', {
        title: "Dịch vụ xây dựng mới, sửa chữa cải tạo tại các quận,huyện Hồ Chí Minh",
        linkbar: data.linkbar,
        content: data.content.html,
        content_head: data.content.html_head,
        meta: data.social.meta,
        social: data.social.social,
        meta_description: 'Hưng Thịnh - công ty chuyên xây dựng nhà phố, sửa chửa nhà, cải tạo mặt bằng ở tất cả các quận, huyện, Tp. Hồ Chí Minh'
      });
    })
});


router.get('/:url', function(req, res, next) {
  async.auto({
      data: function(done) {
        var query = {};

        query['url'] = req.params.url;

        MangLuoiModel.findOne(query).lean().exec(done);
      },
      linkbar: ['data', function(data, done) {
        if (data.data) {
          var domain = req.hostname;
          var protocol = req.protocol;
          var path = req.path;
          var linkbar = {};

          console.log("Config ", config);
          linkbar[0] = config.domain;
          linkbar[1] = linkbar[0] + "/mang-luoi";
          linkbar[2] = linkbar[1] + "/" + req.params.url;

          var first = data.data.title.substring(0, 1);
          var last = data.data.title.substring(1);
          var title = first.toUpperCase() + last.toLowerCase();


          var html = "<div>" +
            '<a href=' + linkbar[0] + '>Trang chủ</a>' + "/" +
            '<a href=' + linkbar[1] + '>Mạng lưới</a>' + "/" +
            '<a href=' + linkbar[2] + '>' + title + '</a>' +
            '</div>';

          req.url_title = title;

          done(null, html);
        } else {
          done();
        }
      }],
      getDataFooter: function(done) {
        MangLuoiModel.aggregate([{
          $project: {
            _id: 0,
            "url": 1,
            "image": 1,
            "title": 1,
            "description": 1
          }
        }]).exec(done);
      },
      footer: ['getDataFooter', function(data, done) {
        if (data) {
          var html = '';
          if (data.getDataFooter) {
            console.log(data.getDataFooter);
            var length = -1;
            if (data.getDataFooter.length > 4) {
              length = 4;
            } else {
              length = data.getDataFooter.length;
            }

            for (var i = 0; i < length; i++) {
              html = html +
                '<div class="col-sm-12 margin-buttom-10 no-padding-left">' +
                '<div class="row">' +
                '<div class="col-sm-2">' +
                '<div>' +
                '<a href="' + "/mang-luoi/" + data.getDataFooter[i].url + '" class="full-image">' +
                '<img alt="' + data.getDataFooter[i].image.alt + '" src="' + data.getDataFooter[i].image.src + '" style="height:100px; width: 100px" />' +
                '</a>' +
                '</div>' +
                '</div>' +
                '<div class="col-sm-10">' +
                '<h4 class="no-padding-top no-margin-top">' +
                '<a href="' + "/mang-luoi/" + data.getDataFooter[i].url + '">' + data.getDataFooter[i].title + '</a>' +
                '</h4>' +
                '<div class="col-md-12 no-padding-left">' +
                '<div class="entry-content">' +
                '<p>' + data.getDataFooter[i].description + '</p>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>'
            }
          }
        }
        done(null, html);
      }],
      footer2: ['getDataFooter', function(data, done) {
        if (data) {
          var length = -1;
          var html = '<h4 style="margin:0">' +
            '<a href="' + config.domain + '">Sửa chữa cải tạo Hưng Thịnh</a>' +
            '</h4>' +
            '<hr style="height: 1px; border-top-color: #000; margin:0">';

          html = html + '<ul>';

          if (data.getDataFooter) {

            if (data.getDataFooter.length > 6) {
              length = 6;
            } else {
              length = data.getDataFooter.length;
            }

            for (var i = 0; i < length; i++) {
              html = html +
                '<li><a href="' + "/mang-luoi/" + data.getDataFooter[i].url + '">' + data.getDataFooter[i].title + '</a></li>'
            }
          }

          html = html + '</ul>';
        }
        done(null, html);
      }],
      social: ['footer2', function(data, done) {
        var social = '';
        var meta = '';

        social = social +
          '<div class="social">' +
          '<span class="Facebook">' +
          '<div class="fb-like" data-href="' + config.domain + '/mang-luoi/' + req.params.url + '" data-layout="button_count" data-action="like" data-size="small" data-show-faces="true" data-share="true"></div>' +
          '</span>' +
          '<span class="google">' +
          '<div class="g-plusone" data-size="medium" data-annotation="inline" data-width="300"></div>' +
          '</span>' +
          '</div>';

        meta = meta +
          '<meta property="og:url" content="http://xaydungcaitao.com/"/>' +
          '<meta property="og:type" content="website" />' +
          '<meta property="og:title" content= "' + req.url_title + '"- Sửa chữa cải tạo Hưng Thịnh"/>' +
          '<meta property="og:description" content="Trang thông tin, kĩ thuật những lưu ý,mẹo nhỏ trong sửa chữa cải tạo" />' +
          '<meta property="og:image" content="http://xaydungcaitao.com/images/1493077256560la_kinh.jpg" />'

        var result = {};

        result['social'] = social;
        result['meta'] = meta;

        done(null, result);
      }]
    },
    function(err, data) {
      if (err) {
        console.log(err);
      }
      if (data.data) {
        var body = decode(data.data.content);
        res.render('MangLuoi/mangluoidetail', {
          title: req.url_title + " - Chuyên xây dựng mới, sửa chữa cải tạo tại Hồ Chí Minh - Sài Gòn",
          body: body,
          linkbar: data.linkbar,
          footer: data.footer,
          footer2: data.footer2,
          meta: data.social.meta,
          social: data.social.social,
          meta_description: 'Hưng Thịnh - công ty chuyên xây dựng nhà phố, sửa chửa nhà, cải tạo mặt bằng ở tất cả các quận, huyện, Tp. Hồ Chí Minh'
        });
      } else {
        return;
      }

    })
});


module.exports = router;
