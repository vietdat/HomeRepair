var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var dongiaxaydungmoiSchema = new Schema({
    url: {type:String, require: true, unique: true},
	title:  {type:String, require: true},
	content:  {type:String, require: true},
	date: {type: Date, default: Date.now()}
});
var DonGiaXayDungMoi = mongoose.model('DonGiaXayDungMoi', dongiaxaydungmoiSchema);
module.exports = DonGiaXayDungMoi;