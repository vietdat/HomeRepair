var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var async = require('async');
var decode = require('decode-html');
var config = require('../config.js');
var NoiThatHungThinhModel = require('../model/noithathungthinh.model');

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

        linkbar[0] = config.domain;
        linkbar[1] = linkbar[0] + "/noi-that-hung-thinh/" + req.params.url;
        var url_title = '';
        switch(req.params.url) {
          case "nem":
              url_title = "Nệm";
              break;
          case "giuong-tu":
              url_title = "Giường, tủ";
              break;
          case "chan-drap-goi":
              url_title = "Chăn, Drap, Gối";
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
      var query = {};
      switch(req.params.url) {
        case "nem":
            query['type'] = 1;
            break;
        case "giuong-tu":
            query['type'] = 2;
            break;
        case "chan-drap-goi":
            query['type'] = 3;
            break;
        default:
            query['type'] = 0;
            break;
      }

      NoiThatHungThinhModel.find(query).exec(done);
    },
    content: ['getData', function(data, done) {
      if(!data.getData && !data.getData.length) {
        res.reder('NoiThatHungThinh/error');
        return;
      }

      let i = 0;
      let content_html = '<div class="page">';
      for(i = 0; i < data.getData.length; i++) {
        if(i%3 == 0) {
          content_html += '<div class="container-content">'
        }

        content_html += '<div class="container-content-each">'
          + '<a href="'+ config.domain + "/noi-that-hung-thinh/" + req.params.url +"/" + data.getData[i].url +'">'
          + '<div class="container-image">'
          +   '<img src="' + data.getData[i].image.src + '" ></img>'
          + '</div>'
          + '<div style="font-size: 25px">'+ data.getData[i].title +'</div>'
          + '<div class="special-price" style="color: black">'+ data.getData[i].price.real +'</div>'
          + '<div style="color: red; font-size: 18px">'+ data.getData[i].price.promotion +'</div>'
          + '</a>'
          + '</div>'
        if(i%3 == 2) {
          content_html += '</div>'
        }
      }
      content_html += '</div></div>'

      done(null, content_html);
    }]
  }, function(err, data) {
    if(err) {
      console.log(err);
    }

    res.render('NoiThatHungThinh/noithathungthinh', {
      title: req.url_title,
      // linkbar: data.linkbar,
      content: data.content,
      // content_head: data.content.html_head,
      // meta: data.social.meta,
      // social: data.social.social,
      // meta_description: req.url_title + ' Hưng Thịnh - công ty chuyên xây dựng nhà phố, sửa chửa nhà, cải tạo mặt bằng với giá tốt nhất'
    });
  });
});

router.get('/:type/:title_url', function(req, res, next) {
  async.auto({
    data: function(done) {
      var query = {};

      query['url'] = req.params.title_url;

      NoiThatHungThinhModel.findOne(query).lean().exec(done);
    },
    linkbar: ['data', function(data, done) {
      if(data.data) {
        var domain = req.hostname;
        var protocol = req.protocol;
        var path = req.path;
        var linkbar = {};

        var url_title = "";
        switch(req.params.type) {
          case "nem":
              url_title = "Nệm";
              break;
          case "giuong-tu":
              url_title = "Giường tủ";
              break;
          case "chan-drap-goi":
              url_title = "Chăn, drap, gối";
              break;
          default:
              url_title = "";
              break;
        }

        console.log("Config ", config );
        linkbar[0] = config.domain;
        linkbar[1] = linkbar[0] + "/noi-that-hung-thinh/" + req.params.type;
        linkbar[2] = linkbar[1] + "/" + req.params.title_url;

        var first = data.data.title.substring(0,1);
        var last = data.data.title.substring(1);
        var title = first.toUpperCase() + last.toLowerCase();

        req.url_title = title + " - " + url_title;

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
    content: ['data', function(data, done) {
      let content_html = '<div class="product-content">'
        + '<div class="top_content">'
        + '<div class="image-product-detail">'
        +  '<img src="'+data.data.image.src+'" alt="'+data.data.image.alt+'" height="300" width="300"></img>'
        + '</div>'
        +'<div class="info-product-detail">'
        +  '<div class="product-description-content" style="padding-top: 0px;border-bottom:1px solid #ccc">'
        +      '<p class="menu-product">Mã sản phẩm</p><p>'+data.data.product_code+'</p>'
        +  '</div>'
        +  '<div class="product-description-content" style="display: flex; padding-top: 0px;border-bottom:1px solid #ccc">'
        +      '<p class="menu-product">Chất liệu</p><p>'+data.data.material+'</p>'
        +  '</div>'
        +  '<div class="product-description-content" style="padding-top: 0px;border-bottom:1px solid #ccc">'
        +      '<p class="menu-product">Kích thước</p><p>'+data.data.size+'</p>'
        +  '</div>'
        +  '<div class="product-description-content" style="padding-top: 0px;border-bottom:1px solid #ccc">'
        +      '<p class="menu-product">Màu sắc</p><p>'+data.data.color+'</p>'
        +  '</div>'
        +  '<div class="product-description-content" style="padding-top: 0px;border-bottom:1px solid #ccc">'
        +      '<p class="menu-product">Bảo hành</p><p>'+data.data.guarantee+'</p>'
        +  '</div>'
        +  '<div class="product-description-content" style="padding-top: 0px;border-bottom:1px solid #ccc">'
        +      '<p class="menu-product">Tình trạng</p><p>'+data.data.status+'</p>'
        +  '</div>'
        +  '<div class="product-description-content" style="padding-top: 0px;border-bottom:1px solid #ccc">'
        +      '<p class="menu-product">Giá</p><p class="special-price">'+data.data.price.real+'</p> <p> &nbsp;-&nbsp; </p><p style="color:red; font-size:14px">'+data.data.price.promotion+'</p>'
        +  '</div>'
        +'</div>'
        + '</div>'
        + '<div class="content-product-detail-footer">'
        +   data.data.content
        + '</div>'
        +'</div>';

        done(null, content_html);
    }],
    getData: function(done) {
      var query = {};
      switch(req.params.type) {
        case "nem":
            query['type'] = 1;
            break;
        case "giuong-tu":
            query['type'] = 2;
            break;
        case "chan-drap-goi":
            query['type'] = 3;
            break;
        default:
            query['type'] = 0;
            break;
      }

      NoiThatHungThinhModel.find(query).exec(done);
    },
    footer: ['getData', function(data, done) {
      let i = 0;
      let content_html = '<div class="page">';
      console.log(data.getData);
      for(i = 0; i < data.getData.length; i++) {
        if(i%3 == 0) {
          console.log('da vao day 230 i%3 ', i%3);
          content_html += '<div class="container-content">'
        }

        content_html += '<div class="container-content-each">'
          + '<a href="'+ config.domain + "/noi-that-hung-thinh/" + req.params.url +"/" + data.getData[i].url +'">'
          + '<div class="container-image">'
          +   '<img src="' + data.getData[i].image.src + '" ></img>'
          + '</div>'
          + '<div style="font-size: 25px">'+ data.getData[i].title +'</div>'
          + '<div class="special-price" style="color: black">'+ data.getData[i].price.real +'</div>'
          +   '<div style="font-size: 18px; color:red">'+ data.getData[i].price.promotion +'</div>'
          + '</a>'
          + '</div>'

        if(i%3 == 2) {
          console.log('da vao day 246 i%3 ', i%3);
          content_html += '</div>'
        }
      }
      content_html += '</div></div>'

      done(null, content_html);
    }]
  },
  function(err, data) {
    if(err) {
      console.log(err);
    }
    if(data.data) {
      var body = decode(data.data.content);
      res.render('NoiThatHungThinh/noithathungthinhdetail', {
        title: req.url_title,
        content: data.content,
        linkbar: data.linkbar,
        footer: data.footer,
        // footer2: data.footer2,
        // meta_description: req.url_title + ' Hưng Thịnh - công ty chuyên xây dựng nhà phố, sửa chửa nhà, cải tạo mặt bằng với giá tốt nhất'
      });
    } else {
      return;
    }

  })
});

module.exports = router;
