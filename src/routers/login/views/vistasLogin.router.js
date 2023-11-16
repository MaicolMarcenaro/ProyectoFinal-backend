import { Router } from "express";

const router = Router();

const privateAdmin = (req, res, next)=>{
    if (!req.session.user) {
        return res.redirect('/login')
    }
    next()
}
const publicZone = (req, res, next)=>{
    if (req.session.user) {
        return res.redirect('/products')
    }
    next()
}

router.get('/register',publicZone, (req, res)=>{
    res.render('register')
})
router.get('/login',publicZone, (req, res)=>{
    res.render('login')
})
router.get('/profile', privateAdmin, (req, res)=>{
    res.render('profile', {user: req.session.user})
})


export default router;