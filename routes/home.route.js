var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var async = require('async');

var ArticleModel = require('../model/article');

router.get('/', function(req, res, next) {
  res.render('Home/homepage', {
  	title: "Sửa chữa cải tạo Hưng Thịnh",
  	body: "body"
  });
});

router.get('/home', function(req, res, next) {
 	res.render('Home/homepage', {
  	title: "Sửa chữa cải tạo Hưng Thịnh",
  	body: "body"
  });
});

router.get('/xxx', function(req, res, next) {
	// ArticleModel.find(function(err,data){
	// 			if (err)
	// 				throw err;
	// 			else{
	// 				res.send(data);
	// 			}
	// 		});

	async.auto({
		init: function(done) {
			ArticleModel.find().exec(done);
		},
		printData:['init', function(done, data) {
			console.log("[home router] data ", data.init);
			res.send(data);
			done();
		}]
	},
	function(err, data) {
		if(err) {
			console.log(err);
		}

		return;
	})
});
module.exports = router;
