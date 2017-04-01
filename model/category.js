var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var categorySchema = new Schema({
    url:String,
  name: String
});
var Category = mongoose.model('Category', categorySchema);
module.exports = Category;