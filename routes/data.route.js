var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var async = require('async');
var GioiThieuModel = require('../model/gioithieu.model');


router.get('/data-gioi-thieu', function(req, res, next) {
  async.auto({
    data: function(done) {
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


router.get('/data-gioi-thieu/:url', function(req, res, next) {
  console.log("asdfasfd");
  async.auto({
    data: function(done) {
      var query = {};

      query['url'] = req.params.url;

      GioiThieuModel.findOne(query).lean().exec(done);
    }
  },
  function(err, data) {
    if(err) {
      console.log(err);
    }

    res.send(data.data);
    
  })
});


module.exports = router;
