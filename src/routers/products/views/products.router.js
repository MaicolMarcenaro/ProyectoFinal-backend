import { Router } from "express";
import ProductManager from "../../../dao/productsManager.js";

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
        res.render('products',{productsDetails : products.payload, products: products});
    }else{
        const opts = {limit, page, sort: {price: sort || 'asc'}}
        const criteria = {}
        if (category) {
            criteria.category= category
        }
        const products = await ProductManager.get(criteria,opts)
        res.render('products',{productsDetails : products.payload, products: products});
    }
    
})

router.get('/product/:pid', async (req, res)=>{
    const {pid} = req.params
    const product = await ProductManager.getById(pid)
    console.log(product);
    res.render('product',product);
})
export default router