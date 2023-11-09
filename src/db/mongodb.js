import mongoose from "mongoose";

export const init = async ()=>{
    try {
        const url= 'mongodb+srv://maicolmarcenaro:18JosnJf3ALsfJWb@cluster0.4higmct.mongodb.net/E-commerce';
        console.log('Conectado a la base')
        await mongoose.connect(url);
    } catch (error) {
        console.log('Error al conectar con la base de datos', error.message);
    }
}