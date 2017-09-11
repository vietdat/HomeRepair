var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var noithathungthinhSchema = new Schema({
    url: {type:String, require: true, unique: true},
	title:  {type:String, require: true},
	product_code: String,
  material: String,
  size: String,
  /**
  * 0: other,
  * 1: Nem,
  * 2: giuong-tu
  * 3: chan_drap_goi
  */
  type: Number,
  color: String,
  guarantee: String,
  status: String,
  price: {
    real: String,
    promotion:String
  },
	image: {
			alt: {type:String, require:true},
			src: {type:String, require:true}
		},
	content: {type:String, require:true},
	date: {type: Date, default: Date.now()}
});
var noithathungthinh = mongoose.model('noithathungthinh', noithathungthinhSchema);
module.exports = noithathungthinh;
