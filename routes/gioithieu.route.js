var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var async = require('async');
var GioiThieuModel = require('../model/gioithieu.model');

router.get('/gioi-thieu', function(req, res, next) {
	async.auto({
		data: function(done) {
			// GioiThieuModel.find().exec(done);
			//GioiThieuModel.distinct("url","image").exec(done);
			GioiThieuModel.aggregate([ { $project : { _id: 0, "url":1, "image":1, "title":1} } 
				]).exec(done);
		}
	},
	function(err, data) {
		if(err) {
			console.log(err);
		}

		// res.send(JSON.stringify(data.data));
		res.render('GioiThieu/gioithieutest', {
		  	title: "Sửa chữa cải tạo Hưng Thịnh"
		});
	})
});

router.get('/data', function(req, res, next) {
	async.auto({
		data: function(done) {
			// GioiThieuModel.find().exec(done);
			//GioiThieuModel.distinct("url","image").exec(done);
			GioiThieuModel.aggregate([ { $project : { _id: 0, "url":1, "image":1, "title":1, "description": 1} } 
				]).exec(done);
		}
	},
	function(err, data) {
		if(err) {
			console.log(err);
		}

		res.send(data.data);
		
	})
});

router.get('/gioi-thieu-test', function(req, res, next) {
	async.auto({
		init: function(done) {
			// GioiThieuModel.find().exec(done);
			//GioiThieuModel.distinct("url","image").exec(done);
			GioiThieuModel.aggregate([ { $project : { _id: 0, "url":1, "image":1, "title":1} } 
				]).exec(done);
		},
		printData:['init', function(data,done) {
			console.log("[home router] data ", data.init);
			done(null);
		}]
	},
	function(err, data) {
		if(err) {
			console.log(err);
		}

		res.send(data);
	})
});

module.exports = router;