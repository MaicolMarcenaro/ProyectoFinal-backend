import express from 'express';
import handlebars from 'express-handlebars';
import expressSession from 'express-session'
import MongoStore from 'connect-mongo'
import { URI } from './db/mongodb.js';
import path from 'path';
import { __dirname } from './utils.js';
import {init as initPassport} from './config/passport.config.js';
import passport from 'passport';

import productApiRouter from './routers/products/api/productsMon.router.js'
import cartApiRouter from './routers/carts/api/cartsMon.router.js'
import loginApiRouter from './routers/login/api/sessions.router.js'

import productViewRouter from './routers/products/views/products.router.js'
import cartViewRouter from './routers/carts/views/carts.router.js'
import viewsLogin from './routers/login/views/vistasLogin.router.js'

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'../public')));

app.engine('handlebars', handlebars.engine());
app.set('views',path.join(__dirname,'./views'));
app.set('view engine','handlebars');
const SESSION_SECRET = 'qBvPkU2X;J1,51Z!~2p[JW.DT|g:4l@';

app.use(expressSession({
    secret: SESSION_SECRET,
    store : MongoStore.create({
        mongoUrl: URI,
        mongoOptions:{},
        ttl:360
    }), 
    resave:true,
    saveUninitialized:true
}))

initPassport()

app.use(passport.initialize())
app.use(passport.session())


app.use('/', productViewRouter, cartViewRouter, viewsLogin);
app.use('/api', productApiRouter,  cartApiRouter, loginApiRouter);

app.get('/', (req, res)=>{
    res.send('Inicio de app')
});

app.use((error,req,res,next)=>{
    const message = `Ah ocurrido un error ${error.message}`;
    console.log(message);
    res.status(500).json({'message' : message});
})

export default app;