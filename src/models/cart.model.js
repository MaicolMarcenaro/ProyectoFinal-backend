import mongoose from "mongoose";

const productSchema= new mongoose.Schema({
    product:{type:mongoose.Schema.Types.ObjectId, ref:'Product'},
    quantity: {type: Number, default: 1},
}, {_id: false})

const cartsSchema = new mongoose.Schema({
    "products":{type:[productSchema], default : []}, 
},{timestamps:true})


export default mongoose.model('Cart', cartsSchema);