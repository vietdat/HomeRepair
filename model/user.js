var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    username:String,
  password: String
});
userSchema.methods.validPassword=function(password){
 return true;
};
var User = mongoose.model('User', userSchema);

module.exports = User;