import { Router } from "express";
import userModel from "../../../models/user.model.js";
import { createHash, isValidPassword } from "../../../utils.js";
import passport from "passport";

const router = Router();

router.post('/sessions/register', passport.authenticate('register', {failureRedirect: '/register'}) ,async(req, res)=>{
    res.redirect('/login')
})
router.post('/sessions/login',passport.authenticate('login', { failureRedirect: '/login' }), async(req, res)=>{
    req.session.user= req.newUser.user
    res.status(200).cookie('access_token', req.newUser.token, {maxAge:600000, httpOnly: true, signed:true}).json({message: 'Inicio de session correcto'})
    res.redirect('/products')
})

router.get('/sessions/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/sessions/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
  req.session.user = req.user;
  res.redirect('/profile');
})

router.post('/sessions/recovery-password', async (req, res)=>{
    const {email, newPassword} = req.body
    const user = await userModel.findOne({email});
    if (!user) {
        return res.status(401).send("Correo o Password incorrecto")
    }
    await userModel.updateOne({email}, {$set : {password : createHash(newPassword)}})
    res.redirect('/login')
})

router.get('/sessions/logout',(req, res)=>{
    req.session.destroy((error)=> res.redirect('/login'))
})

export default router