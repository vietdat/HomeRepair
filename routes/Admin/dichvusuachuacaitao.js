var express = require('express');
var router = express.Router();
var DichVuSuaChuaCaiTaoModel = require('../../model/dichvusuachuacaitao.model');
var decode = require('decode-html');
var Busboy = require('busboy');
var fs = require('fs');
var path = require('path');

router.get('/', function(req, res, next) {
  DichVuSuaChuaCaiTaoModel.find(function(err, data) {
    if (err) throw err;
    else {
      data.forEach(function(element) {
        element.content = decode(element.content);
      }, this);
      res.locals.data = data;
      res.render('Admin/dichvusuachuacaitao', {
        layout: 'Admin/layout'
      });
    }
  })
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
    var d = new Date();
    var n = d.getTime().toString();
    urlImage = n + filename;
    console.log("Url image: ", urlImage);
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
    var item = new DichVuSuaChuaCaiTaoModel({
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
      else res.redirect('/hungthinh-admin/dich-vu-sua-chua-cai-tao');
    })
  });
  req.pipe(busboy);
});

router.post('/delete', function(req, res, next) {
  var id = req.body.id;
  DichVuSuaChuaCaiTaoModel.remove({
    _id: id
  }, function(err) {
    console.log(err);
    if (err) {
      res.send(err);
    } else {
      res.send('success');
    }
  });

})
module.exports = router;
