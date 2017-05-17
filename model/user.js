var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;
var userSchema = new Schema({
  username: String,
  password: String
});

userSchema.pre('save', function(next) {
  var user = this;

  //If the password has not been modified in this save operation, leave it alone (So we don't double hash it)
  if (!user.isModified('password')) {
    next();
    return;
  }

  //Encrypt it using bCrypt. Using the Sync method instead of Async to keep the code simple.
  var hash = crypto.createHash('sha256');
  var passHash = hash.update(user.password).digest('hex');
  //Replace the plaintext pw with the Hash+Salted pw;
  user.password = passHash;

  //Continue with the save operation
  next();

});

userSchema.methods.validPassword = function(password) {
  var hash = crypto.createHash('sha256');
  var passHash = hash.update(password).digest('hex');
  if (passHash == this.password)
    return true;
  else return false;
};
var User = mongoose.model('User', userSchema);

module.exports = User;
