var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var async = require('async');
var decode = require('decode-html');
var config = require('../config.js');
var GioiThieuModel = require('../model/gioithieu.model');

router.get('/', function(req, res, next) {
    res.render('LienHe/lienhe',{
      title: "Liên hệ sửa chữa cải tạo Hưng Thịnh để được tư vấn sửa chữa cải tạo nhà tốt nhất"
    });
});

module.exports = router;
