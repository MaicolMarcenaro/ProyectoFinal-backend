import mongoose from "mongoose";

const cartSchema= new mongoose.Schema({
    cart:{type:mongoose.Schema.Types.ObjectId, ref:'Cart'},
    quantity: {type: Number, default: 1},
}, {_id: false})

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: { type: String , unique: true},
    age: Number,
    password: { type: String , required: true},
    role: { type: String , default: 'usuario' , enum : ['usuario', 'seller', 'admin']},
    provider: String,
    cart: {type:[cartSchema], default : []}
}, {timestamps:true})


export default mongoose.model('User', userSchema)