var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var noithatSchema = new Schema({
    url: {type:String, require: true, unique: true},
	title:  {type:String, require: true},
	content:  {type:String, require: true},
	image: {
			alt: {type:String, require:true},
			src: {type:String, require:true}
	},
	type: {type:String, require:true},
	description: {type:String, require:true},
	date: {type: Date, default: Date.now()}
});
var NoiThat = mongoose.model('NoiThat', noithatSchema);
module.exports = NoiThat;
