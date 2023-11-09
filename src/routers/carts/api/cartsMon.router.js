import {Router} from 'express';
import CartsManager from '../../../dao/CartsManager.js';

const router = Router();

router.get('/carts', async(req, res)=>{
    const {query = {}} = req;
    const carts = await CartsManager.get(query);
    res.status(200).json(carts);
})


router.get('/carts/:cid', async (req, res)=>{
    const {cid} = req.params
    const cart = await CartsManager.getById(cid);
    res.status(200).json(cart)
})

router.get('/cartsWithProducts/:cid', async (req, res)=>{
    const {cid} = req.params
    const cart = await CartsManager.getByIdPrd(cid);
    res.status(200).json(cart)
})

router.post('/carts', async(req,res)=>{
    const {body} = req;
    const newCarrito = {
        ...body
    }
    const cart = await CartsManager.create(newCarrito);
    res.status(201).json(cart)
})

router.put('/carts/:cid', async (req, res)=>{
    try {
        const {cid} = req.params;
        const {body} = req;
        await CartsManager.updateById(cid, body);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.delete('/carts/:cid', async (req, res)=>{
    try {
        const {cid} = req.params;
        await CartsManager.deleteById(cid)
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.put('/carts/:cid/products/:pid', async (req, res)=>{
    const {cid, pid} = req.params;
    const { quantity} = req.body;
    const cartUp = await CartsManager.addProduct(cid, pid, quantity)
    console.log("Agregado correctamente")
    res.status(204).json(cartUp)
})

router.delete('/carts/:cid/products/:pid', async(req,res)=>{
    const {cid, pid} = req.params;
    await CartsManager.deleteProduct(cid, pid)
    console.log("Producto eliminado")
    res.status(204).end()
})
export default router;