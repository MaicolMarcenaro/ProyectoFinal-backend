import { Router } from "express";
import userModel from "../../../models/user.model.js";

const router = Router();

router.post('/sessions/register', async(req, res)=>{
    const {body} = req
    if (body.email==="adminCoder@coder.com" && body.password==="adminCod3r123") {
        const newUser = {...body, role:"admin"}
        await userModel.create(newUser)
    }else{
        const newUser = {...body, role:"usuario"}
        await userModel.create(newUser)
    }
    res.redirect('/login')
})
router.post('/sessions/login', async(req, res)=>{
    const { body : {email , password}} = req
    const user = await userModel.findOne({email})
    if (!user) {
        return res.status(401).send('Usuario o contraseña invalidos')
    }
    const passIsValid = user.password === password
    if (!passIsValid) {
        return res.status(401).send('Usuario o contraseña invalidos')
    }
    const {firstName, lastName, role} = user
    req.session.user = {
        firstName, lastName, email, role
    }
    res.redirect('/products')
})
router.get('/sessions/logout',(req, res)=>{
    req.session.destroy((error)=> res.redirect('/login'))
})

export default router