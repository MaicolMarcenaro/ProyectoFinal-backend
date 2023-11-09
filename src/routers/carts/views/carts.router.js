import { Router } from "express";
import CartsManager from "../../../dao/CartsManager.js";

const router = Router();


router.get('/carts', async (req, res)=>{
    const carts = await CartsManager.get()
    res.render('carts',{carts : carts.map(c => c.toJSON())});
})

router.get('/carts/:cid', async (req, res)=>{
    const {cid} = req.params
    const carts = await CartsManager.getByIdPrd(cid)
    res.render('cartsID',{carts:carts,  product:carts.products});
})

export default router