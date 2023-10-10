import express from 'express';
import {v4 as uuidv4} from 'uuid'
import  {ProductManager}  from '../ProductManager.js';
import { addCart, getCarts } from '../CartManagger.js';

const router = express.Router();
const PATH='./carritos.json';
const carts= await getCarts(PATH)
const classProducts = new ProductManager("./products.json")

router.post('/carts', (req,res)=>{
    const {body} = req;
    const newCart = {
        id: uuidv4(),
        ...body
    }
    addCart(PATH,newCart)
    res.status(201).json(newCart)
});

router.get('/carts/:cId', (req,res)=>{
    const {cId} = req.params;
    const cartFilter = carts.find(c => c.id== cId)
    const cartProducts = cartFilter.products
    const cartProductsFilter = []
    cartProducts.forEach(e => {
        cartProductsFilter.push(e.pId)
    });
    const listaProducts = []
    cartProductsFilter.forEach(ele=>{
        const prd = classProducts.getProductById(ele)
        listaProducts.push(prd)
    })

    const listaCart={
        'id':cId,
        "prducts":listaProducts
    }
    if (cartFilter) {
        res.status(200).json(listaCart)
    } else {
        res.status(300).json('ID cart no existe')
    }
    
});

// router.post('/carts/:cId/products/:pId', (req,res)=>{
//     const {cId, pId} = req.params;
//     const cartFilter = carts.find(c => c.id== cId)
//     const cartProducts = cartFilter.products
//     const prdASumar = cartProducts.find(prd=> prd.pId === pId)
//     if (prdASumar) {
        
//     } else {
        
//     }
//     prdASumar.quantity++
//     console.log(prdASumar)
//     const cartProductsFilter = []
//     cartProducts.forEach(e => {
//         cartProductsFilter.push(e.pId)
//     });
//     const listaProducts = []
//     cartProductsFilter.forEach(ele=>{
//         const prd = classProducts.getProductById(ele)
//         listaProducts.push(prd)
//     })
// });


export default router