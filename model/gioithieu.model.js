var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var gioithieuSchema = new Schema({
    url: {type:String, require: true, unique: true},
	title:  {type:String, require: true},
	content:  {type:String, require: true},
	image: {
			alt: {type:String, require:true,default:""},
			src: {type:String, require:true,default:""}
		},
	description: {type:String, require:true,default:""},
	date: {type: Date, default: Date.now()}
});
var GioiThieu = mongoose.model('GioiThieu', gioithieuSchema);
module.exports = GioiThieu;