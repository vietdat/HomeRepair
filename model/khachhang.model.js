var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var khachhangSchema = new Schema({
	name: {type:String, require: true},
	content:  {type:String, require: true},
	image: {
			alt: {type:String, require:true},
			src: {type:String, require:true}
		},
	date: {type: Date, default: Date.now()}
});
var khachhang = mongoose.model('khachhang', khachhangSchema);
module.exports = khachhang;
