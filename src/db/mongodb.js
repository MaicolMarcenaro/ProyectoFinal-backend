import mongoose from "mongoose";

export const URI = 'mongodb+srv://maicolmarcenaro:18JosnJf3ALsfJWb@cluster0.4higmct.mongodb.net/E-commerce'

export const init = async ()=>{
    try {
        const url= URI;
        console.log('Conectado a la base')
        await mongoose.connect(url);
    } catch (error) {
        console.log('Error al conectar con la base de datos', error.message);
    }
}