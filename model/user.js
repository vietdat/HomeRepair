var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    username:String,
  password: String
});
userSchema.methods.validPassword=function(password){
 if (password==this.password)
 return true;
 else return false;
};
var User = mongoose.model('User', userSchema);

module.exports = User;