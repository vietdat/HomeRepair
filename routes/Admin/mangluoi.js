var express = require('express');
var router = express.Router();
var MangLuoiModel = require('../../model/mangluoi.model');
var decode = require('decode-html');
var Busboy = require('busboy');
var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');

/* GET home page. */
router.get('/', function(req, res, next) {
  //get category list
  MangLuoiModel.find(function(err, MangLuoiModelList) {
    if (err) throw err;
    else {
      MangLuoiModelList.forEach(function(element) {
        console.log(decode(element.content));
        element.content = decode(element.content);
      }, this);
      res.locals.MangLuoiModelList = MangLuoiModelList;
      res.render('Admin/mangluoi', {
        layout: 'Admin/layout'
      });
    }
  })
  // res.render('index', { title: 'Express' });
});
router.post('/add', function(req, res, next) {
  var url = "",
    title = "",
    content = "",
    altImage = "",
    urlImage = "",
    description = "",
    type = "";
  var busboy = new Busboy({
    headers: req.headers
  });
  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    urlImage = filename;
    file.pipe(fs.createWriteStream(path.join(process.env.PWD, 'public/images', filename)));
  });
  busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
    console.log('Field [' + fieldname + ']: value: ');
  });
  busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
    switch (fieldname) {
      case 'title':
        title = val;
        break;
      case 'url':
        url = val;
        break;
      case 'altImage':
        altImage = val;
        break;
      case 'description':
        description = val;
        break;
      case 'content':
        content = val;
        break;
      case 'type':
        type = val;
        break;
      default:
        break;
    }
  });
  busboy.on('finish', function() {
    var item = new MangLuoiModel({
      url: url,
      title: title,
      content: content,
      image: {
        'alt': altImage,
        'src': '/images/' + urlImage
      },
      description: description,
      type: type
    });

    item.save(function(err) {
      if (err) throw err;
      else res.redirect('/hungthinh-admin/mang-luoi');
    })
  });
  req.pipe(busboy);
});

router.post('/delete', function(req, res, next) {
  var id = req.body.id;
  MangLuoiModel.remove({
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
  MangLuoiModel.find({
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
    title = "",
    content = "",
    altImage = "",
    urlImage = "",
    urlImage2 = "",
    description = "";
    flag = false;
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
      case 'title':
        title = val;
        break;
      case 'id':
        id =  mongoose.Types.ObjectId(val);
        break;
      case 'url':
        url = val;
        break;
      case 'altImage':
        altImage = val;
        break;
      case 'urlImage':
        urlImage2 = val.substring(8);
        console.log("url image2: ", urlImage);
        break;
      case 'description':
        description = val;
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
      url: url,
      title: title,
      content: content,
      image: {
        'alt': altImage,
        'src': '/images/' + urlImage
      },
      description: description
    };

    MangLuoiModel.findOneAndUpdate({
      _id: id
    },item,{
      upsert: true
    },function(err, doc){
        if (err) return res.send(500, { error: err });
        else res.redirect('/hungthinh-admin/mang-luoi');
    });
  });
  req.pipe(busboy);
});

module.exports = router;
