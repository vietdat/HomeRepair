var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var articleSchema = new Schema({
    url:String,
  title: String,
  content:String
});
var Article = mongoose.model('Article', articleSchema);
module.exports = Article;