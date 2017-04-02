var mongoose = require('mongoose');
var crypto=require('crypto');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    username:String,
  password: String
});
userSchema.methods.validPassword=function(password){
  var hash=crypto.createHash('sha256');
  var passHash=hash.update(password).digest('hex');
 if (passHash==this.password)
 return true;
 else return false;
};
var User = mongoose.model('User', userSchema);

module.exports = User;