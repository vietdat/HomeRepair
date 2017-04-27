var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var async = require('async');
var DonGiaModel = require('../model/dongia.model');


router.get('/', function(req, res, next) {
  res.render('Home/homepage', {
  	title: "Sửa chữa cải tạo Hưng Thịnh",
  	body: "body"
  });
});

// router.get('/home', function(req, res, next) {
//   async.auto({
//     // dongia:function(done) {
//     //   DonGiaModel.find().lean().exec(done);
//     // },
//     // dongiasuachuacaitao: ['dongia',function(data, done) {
//     //   forEach
//     // }],
//     // dongiaxaydungmoi:['dongia',function(data, done) {
//     //
//     // }],
//
//
//   });
//  	res.render('Home/homepage', {
//   	title: "Sửa chữa cải tạo Hưng Thịnh",
//   	body: "body"
//   });
// });

module.exports = router;
