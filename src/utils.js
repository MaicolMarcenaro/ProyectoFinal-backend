import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import bcrypt from 'bcrypt'

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

