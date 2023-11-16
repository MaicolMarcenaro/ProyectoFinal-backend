import {Router} from 'express';
import ProductManager from '../../../dao/productsManager.js';
import { uploader } from '../../../utils.js';


const router = Router();

router.get('/products', async(req, res)=>{
    const {limit= 5, page=1, category, price=''} = req.query;
    const opts = {limit, page}
    const criteria = {}
    if (category) {
        criteria.category= category
    }
    try {
        const products = await ProductManager.get(criteria,opts,price)
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({'error' : error})
    }
})

router.get('products/:pid',async(req,res)=>{
    const {pid}= req.params;
    try {
        const products = await ProductManager.getById(pid)
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({'error' : error})
    }
})

router.post('/products', uploader.single('thumbnails') ,async(req,res)=>{
    const urlIMG= 'http://localhost:8080/img';
    const {body, file} = req;
    const newProduct = {
        ...body,
        status:true,
        thumbnails: file ? `${urlIMG}/${file.filename}` : ''
    }
    try {
        const product = await ProductManager.create(newProduct);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({'error' : error})
    }
})

router.put('/products/:pid', async (req,res)=>{
    const {pid} = req.params;
    const {body} = req
    try {
        const productActualizado = await ProductManager.updateById(pid,body)
        res.status(204).json(productActualizado);
    } catch (error) {
        res.status(500).json('error' , error)
    }
})

router.delete('/products/pid',  async (req,res)=>{
    const {pid} = req.params;
    try {
        await ProductManager.deleteById(pid)
     res.status(204).end();
    } catch (error) {
        res.status(500).json('error' , error)
    }
})



export default router;