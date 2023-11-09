import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';
import { __dirname } from './utils.js';

import productApiRouter from './routers/products/api/productsMon.router.js'
import cartApiRouter from './routers/carts/api/cartsMon.router.js'

import productViewRouter from './routers/products/views/products.router.js'
import cartViewRouter from './routers/carts/views/carts.router.js'

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'../public')));

app.engine('handlebars', handlebars.engine());
app.set('views',path.join(__dirname,'./views'));
app.set('view engine','handlebars');

app.use('/', productViewRouter, cartViewRouter);
app.use('/api', productApiRouter,  cartApiRouter);

app.get('/', (req, res)=>{
    res.send('Inicio de app')
});

app.use((error,req,res,next)=>{
    const message = `Ah ocurrido un error ${error.message}`;
    console.log(message);
    res.status(500).json({'message' : message});
})

export default app;