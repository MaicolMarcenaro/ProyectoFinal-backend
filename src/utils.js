import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import bcrypt from 'bcrypt';
import passport from 'passport';
import JWT from 'jsonwebtoken';


const __filename = fileURLToPath(import.meta.url);

export const __dirname = path.dirname(__filename);

// export class Exception extends error(){
//     constructor(message, status){
//         super(message)
//         this.statusCode = status
//     }
// }

export const createHash = (password) =>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}
    
export const isValidPassword = (password, user) =>{
    return bcrypt.compareSync(password, user.password)
}
export const tokenGenerator = (user)=>{
    const {_id :id, first_name, last_name, email, role, } = user
    const payload ={
        id,
        first_name,
        last_name,
        email,
        role,
    };
    return JWT.sign(payload,'qBvPkU2X;J1,51Z!~2p[JW.DT|g:4l@',{expiresIn: '10m'});
}

export const verifyToken = (token)=>{
    return new Promise((resolve, reject) => {
        JWT.verify(token,'qBvPkU2X;J1,51Z!~2p[JW.DT|g:4l@',(error, payload)=>{
            if (error) {
                return reject(error)
            }
            resolve(payload)
        })
    })
    
}

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        const pathFile = path.join(__dirname,'../public/img');
        cb(null,pathFile);
    },
    filename: (req, file, cb)=>{
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename);
    }
})
export const uploader= multer({storage});

