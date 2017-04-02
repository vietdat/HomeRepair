var express = require('express');
var router = express.Router();
var passport=require('passport');
/* GET home page. */
router.get('/',function(req,res){
  res.render('Admin/login');
})
router.post('/',
  passport.authenticate('local', { successRedirect: '/hungthinh-admin/gioi-thieu',
                                   failureRedirect: '/hungthinh-admin/'
                                  })
);
module.exports = router;
