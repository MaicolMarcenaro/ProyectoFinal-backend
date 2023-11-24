import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String , unique: true},
    age: Number,
    password: String,
    role: String,
    provider: String,
}, {timestamps:true})


export default mongoose.model('User', userSchema)