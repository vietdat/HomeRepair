var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var async = require('async');
var decode = require('decode-html');
var config = require('../config.js');
var KhachHangModel = require('../model/khachhang.model');

router.get('/', function(req, res, next) {
  async.auto({
    linkbar:function(done) {
        var path = req.path;
        var linkbar = {};

        linkbar[0] = config.domain;
        linkbar[1] = linkbar[0] + "/khach-hang";

        var html = "<div>"
                    + '<a href=' + linkbar[0] + '>Trang chủ</a>' + "/"
                    + '<a href=' + linkbar[1] + '>Khách hàng</a>'
                    + '</div>';
        done(null, html);
    },
    getData: function(done) {
      KhachHangModel.find().lean().exec(done);
    },
    content: ['getData', function(data, done) {
      var content = '';
      datas = data.getData;
      datas.forEach(function(data, index, arr) {
        content = content
        + '<div class="col-sm-12 margin-buttom-10 no-padding-left">'
        +    '<div class="row">'
        +     '<div class="col-sm-3">'
        +       '<div>'
        +          '<a href="" class="full-image">'
        +            '<img alt="'+ data.image.alt + '" src="' + data.image.src +'" style="width: 100%" />'
        +          '</a>'
        +       '</div>'
        +     '</div>'
        +     '<div class="col-sm-9">'
        +         '<div class="col-md-12 no-padding-left">'
        +             '<div class="entry-content">'
        +                 decode(data.content)
        +             '</div>'
        +         '</div>'
        +      '</div>'
        +   '</div>'
        + '</div>';
      });

      done(null, content);
    }]
  },
  function(err, data) {
    if(err) {
      console.log(err);
    }
    res.render('KhachHang/khachhang', {
      title: "Phản hồi khách hàng sau khi sử dụng dịch vụ xây dựng mới, sửa chữa cải tạo tại sửa chữa cải tạo Hưng Thịnh",
      content: data.content,
      linkbar: data.linkbar
    });
  })
});

module.exports = router;
