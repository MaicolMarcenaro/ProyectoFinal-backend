import express from 'express';
import {v4 as uuidv4} from 'uuid'
import  {ProductManager}  from '../ProductManager.js';

const router = express.Router();

const classProducts = new ProductManager("./products.json")


router.get('/products', (req, res)=>{
    const products= classProducts.getProductsPlain()
    const {limit} = req.query
    if (!limit) {
        res.status(200).json(products);
    } else {
        const productsLimited = [];
        for (let i = 0; i < limit; i++) {
            productsLimited.push(products[i])
        }
        res.status(200).json(productsLimited)
    }
    
});
router.get('/products/:pId', (req, res)=>{
    const products= classProducts.getProductsPlain()
    const {pId} = req.params;
    const searchId = classProducts.getProductById(pId);
    if (searchId) {
        res.status(200).json(searchId);
    } else {
        res.status(200).json(products);
    }
    
});
router.post('/products',(req,res)=>{
    const {body} = req;
    const newProduct = {
        
        ...body
    }
    classProducts.addProduct(newProduct)
    res.status(201).json(newProduct)

});
router.put('/products/:pId',(req,res)=>{
    const {pId} = req.params;
    const {body} = req;
    const searchId = classProducts.getProductById(pId);
    if (searchId) {
        const updateProduct = {
            id: pId,
            ...body
        }
        classProducts.updateProduct(updateProduct);
        res.status(202).json(updateProduct)
    } else {
        res.status(400).json(`ID: ${pId}  no valido `)
    }
    
});
router.delete('/products/:pId',(req,res)=>{
    const {pId} = req.params;
    const searchId = classProducts.getProductById(pId);
    if (searchId) {
        classProducts.deleteProduct(pId)
        res.status(203).json(`Producto Eliminado`)
    } else {
        res.status(400).json(`ID: ${pId}  no valido `)
    }
    
});


export default router