var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var mangluoiSchema = new Schema({
    url: {type:String, require: true, unique: true},
	title:  {type:String, require: true},
	content:  {type:String, require: true},
	image: {
			alt: {type:String, require:true},
			src: {type:String, require:true}
		},
	description: {type:String, require:true},
	date: {type: Date, default: Date.now()}
});
var mangluoi = mongoose.model('mangluoi', mangluoiSchema);
module.exports = mangluoi;