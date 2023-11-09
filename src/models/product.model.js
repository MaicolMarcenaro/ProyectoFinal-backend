import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const productsSchema = new mongoose.Schema({
		"title": {type: String, Required: true},
		"category": {type: String, required: true},
		"description": {type: String, required: true},
		"price": {type: Number, required: true},
		"thumbnails": {type: String},
		"status": { type: Boolean, default:true},
		"code": {type: String, required: true},
		"stock": {type: Number, required: true}
},{timestamps: true})

productsSchema.plugin(mongoosePaginate);

export default mongoose.model('Product',productsSchema);