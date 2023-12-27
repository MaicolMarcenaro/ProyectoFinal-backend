import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';
import { __dirname, Exception } from './utils.js';
import {init as initPassport} from './config/passport.config.js';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import cors from 'cors'

import productApiRouter from './routers/products/api/productsMon.router.js'
import cartApiRouter from './routers/carts/api/cartsMon.router.js'
import loginApiRouter from './routers/login/api/sessions.router.js'
import userApiRouter from './routers/user/api/user.router.js'

import productViewRouter from './routers/products/views/products.router.js'
import cartViewRouter from './routers/carts/views/carts.router.js'
import viewsLogin from './routers/login/views/vistasLogin.router.js'

const app = express()

const corsOptions = {
    origin: 'http://localhost:5500',
    methods: ['GET','POST','PUT'],
  };
  
app.use(cors(corsOptions));
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'../public')));

app.engine('handlebars', handlebars.engine());
app.set('views',path.join(__dirname,'./views'));
app.set('view engine','handlebars');


initPassport()

app.use(passport.initialize())


app.use('/', productViewRouter, cartViewRouter, viewsLogin);
app.use('/api', productApiRouter,  cartApiRouter, loginApiRouter, userApiRouter);

app.get('/', (req, res)=>{
    res.send('Inicio de app')
});

app.use((error, req, res, next) => {
    if (error instanceof Exception) {
      res.status(error.status).json({ status: 'error', message: error.message });
    } else {
      const message = `Ah ocurrido un error desconocido 😨: ${error.message}`;
      console.log(message);
      res.status(500).json({ status: 'error', message });
    }
  });

export default app;