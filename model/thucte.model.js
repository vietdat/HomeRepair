var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var thucteSchema = new Schema({
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
var thucte = mongoose.model('thucte', thucteSchema);
module.exports = thucte;