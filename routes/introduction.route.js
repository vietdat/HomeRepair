var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var async = require('async');
var decode = require('decode-html');
var config = require('../config.js');
var GioiThieuModel = require('../model/gioithieu.model');

router.get('/', function(req, res, next) {
  res.render('GioiThieu/gioithieu', {
    title: "Sửa chữa cải tạo Hưng Thịnh",
    body: "body"
  });
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
        
        var html = "<div>"
                    + '<a href=' + linkbar[0] + '>Trang chủ</a>' + "/ "
                    + '<a href=' + linkbar[1] + '>Giới thiệu</a>' + "/ "
                    + '<a href=' + linkbar[2] + '>' + data.data.title +'</a>'
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
    footer: ['getDataFooter', function(done) {
      
      done();
    }]
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
        linkbar: data.linkbar
      });
    } else {
      return;
    }
    
  })
});


module.exports = router;
