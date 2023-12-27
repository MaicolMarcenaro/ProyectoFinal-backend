import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';


const __filename = fileURLToPath(import.meta.url);

export const __dirname = path.dirname(__filename);

export const JWT_SECRET = 'qBvPkU2X;J1,51Z!~2p[JW.DT|g:4l@';

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
    return JWT.sign(payload, JWT_SECRET ,{expiresIn: '10m'});
}

export const verifyToken = (token)=>{
    return new Promise((resolve, reject) => {
        JWT.verify(token,JWT_SECRET,(error, payload)=>{
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

export class Exception extends Error {
    constructor(message, statusCode) {
      super(message);
      this.status = statusCode;
    }
  }
  export class NotFoundException extends Exception {
    constructor(message) {
      super(message, 404);
    }
  }
  
  export class BadRequestException extends Exception {
    constructor(message) {
      super(message, 400);
    }
  }
  
  export class UnauthorizedException extends Exception {
    constructor(message) {
      super(message, 401);
    }
  }
  
  export class ForbiddenException extends Exception {
    constructor(message) {
      super(message, 403);
    }
  }