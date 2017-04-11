var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var async = require('async');
var decode = require('decode-html');
var config = require('../config.js');
var GioiThieuModel = require('../model/gioithieu.model');

router.get('/', function(req, res, next) {
    res.render('LienHe/lienhe');
});

module.exports = router;
