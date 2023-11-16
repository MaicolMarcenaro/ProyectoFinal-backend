import { Router } from "express";
import ProductManager from "../../../dao/productsManager.js";
import{ Types } from 'mongoose';

const router = Router();


router.get('/products', async (req, res)=>{
    const {limit= 5, page=1, category, sort} = req.query;
    if (sort!=="desc" && sort!=="asc") {
        const opts = {limit, page, sort: {price: 'asc'}}
        const criteria = {}
        if (category) {
            criteria.category= category
        }
        const products = await ProductManager.get(criteria,opts)
        if (req.session.user) {
            res.render('products',{productsDetails : products.payload, products: products, user: req.session.user});
        } else {
            res.render('products',{productsDetails : products.payload, products: products});
        }
    }else{
        const opts = {limit, page, sort: {price: sort || 'asc'}}
        const criteria = {}
        if (category) {
            criteria.category= category
        }
        const products = await ProductManager.get(criteria,opts)
        if (req.session.user) {
            res.render('products',{productsDetails : products.payload, products: products, user: req.session.user});
        } else {
            res.render('products',{productsDetails : products.payload, products: products});
        }
    }
    
})

router.get('/product/:pid', async (req, res)=>{
    const {pid} = req.params
    if (!Types.ObjectId.isValid(pid)) {
        // Manejar el caso en el que pid no sea un ObjectId válido
        res.status(400).send("El identificador de producto no es válido");
        return;
    }
    const product = await ProductManager.getById(pid)
    console.log(product);
    res.render('product',product);
})
export default router