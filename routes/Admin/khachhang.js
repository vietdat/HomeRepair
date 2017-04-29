var express = require('express');
var router = express.Router();
var KhachHangModel = require('../../model/khachhang.model');
var decode = require('decode-html');
var Busboy = require('busboy');
var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');

router.get('/', function(req, res, next) {
  KhachHangModel.find(function(err, data) {
    if (err) throw err;
    else {
      data.forEach(function(element) {
        element.content = decode(element.content);
      }, this);
      res.locals.data = data;
      res.render('Admin/khachhang', {
        layout: 'Admin/layout'
      });
    }
  })
});

router.post('/add', function(req, res, next) {
  var url = "",
    name = "",
    content = "",
    altImage = "",
    urlImage = "",
    description = "",
    type = "";
  var busboy = new Busboy({
    headers: req.headers
  });
  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    var d = new Date();
    var n = d.getTime().toString();
    urlImage = n + filename;
    file.pipe(fs.createWriteStream(path.join(process.env.PWD, 'public/images', urlImage)));
  });
  busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
    console.log('Field [' + fieldname + ']: value: ');
  });
  busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
    switch (fieldname) {
      case 'name':
        name = val;
        break;
      case 'altImage':
        altImage = val;
        break;
      case 'content':
        content = val;
        break;
      default:
        break;
    }
  });
  busboy.on('finish', function() {
    var item = new KhachHangModel({
      name: name,
      content: content,
      image: {
        'alt': altImage,
        'src': '/images/' + urlImage
      }
    });

    item.save(function(err) {
      if (err) throw err;
      else res.redirect('/hungthinh-admin/khach-hang');
    })
  });
  req.pipe(busboy);
});

router.post('/delete', function(req, res, next) {
  var id = req.body.id;
  KhachHangModel.remove({
    _id: id
  }, function(err) {
    console.log(err);
    if (err) {
      res.send(err);
    } else {
      res.send('success');
    }
  });
});

router.post('/edit', function(req, res, next) {
  var id = req.body.id;
  KhachHangModel.find({
    _id: id
  }, function(err, data) {
    console.log(err);
    if (err) {
      res.send(err);
    } else {
      data[0].content = decode(data[0].content);
      res.send(data);
    }
  });
});

router.post('/update', function(req, res, next) {

  var url = "",
    id = "",
    name = "",
    content = "",
    altImage = "",
    urlImage = "",
    urlImage2 = "",
    flag = false;
    description = "",
    type = "";
  var busboy = new Busboy({
    headers: req.headers
  });
  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    var d = new Date();
    var n = d.getTime().toString();
    urlImage = n + filename;
    console.log("Url image1: ", urlImage);
    if(filename ===  "") {
      flag = false;
    } else {
      flag = true;
    }
    file.pipe(fs.createWriteStream(path.join(process.env.PWD, 'public/images', urlImage)));
  });
  busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
    console.log('Field [' + fieldname + ']: value: ');
  });
  busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
    switch (fieldname) {
      case 'name':
        name = val;
        break;
      case 'id':
        id =  mongoose.Types.ObjectId(val);
        break;
      case 'altImage':
        altImage = val;
        break;
      case 'urlImage':
        urlImage2 = val.substring(8);
        console.log("url image2: ", urlImage);
        break;
      case 'content':
        content = val;
        break;
      default:
        break;
    }
  });
  busboy.on('finish', function() {
    if(!flag) {
      urlImage = urlImage2;
    }
    var item = {
      name: name,
      content: content,
      image: {
        'alt': altImage,
        'src': '/images/' + urlImage
      }
    };

    KhachHangModel.findOneAndUpdate({
      _id: id
    },item,{
      upsert: true
    },function(err, doc){
        if (err) return res.send(500, { error: err });
        else res.redirect('/hungthinh-admin/khach-hang');
    });
  });
  req.pipe(busboy);
});

module.exports = router;
