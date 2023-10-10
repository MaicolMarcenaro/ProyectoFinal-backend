import express from 'express';
import productsRouter from './routers/products.router.js';
import cartsRouter from './routers/carts.router.js';


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api', productsRouter, cartsRouter);

app.get('/', (req, res)=>{
    res.send('Inicio de app')
});


app.listen(8080, ()=>{
    console.log('Proyecto Corriendo en Puerto 8080');
});