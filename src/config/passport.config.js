import passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

import UserService from '../dao/user.mongodb.dao.js'
import { JWT_SECRET } from '../utils.js';

function cookieExtractor(req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.access_token;
  }
  return token;
}

export const init = () => {
  passport.use('jwt', new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: JWT_SECRET,
  }, async (payload, done) => {
    const user = await UserService.getById(payload.id);
    done(null, user);
  }));
};



// import { createHash, isValidPassword, tokenGenerator, verifyToken } from "../utils.js";
// import passport from 'passport'
// import {Strategy as LocalStrategy} from 'passport-local'
// import { Strategy as GithubStrategy } from 'passport-github2';


// const opts = {
//     usernameField: "email",
//     passReqToCallback: true,
// }

// const githubOpts = {
//   clientID: 'Iv1.bf50fd786116c829', 
//   clientSecret: '9fca9b70ec04ed2cf5a8f56c83f03a0011797fa5',
//   callbackURL: "http://localhost:8080/api/sessions/github/callback", 
// };


// export const init = () => {
//     passport.use('register', new LocalStrategy(opts, async (req, email, password, done) => {
//       try {
//         const user = await userModel.findOne({ email });
//         let newUser = {}
//         if (user) {
//           return done(new Error('User already register 😨'));
//         }
//         if (email==="adminCoder@coder.com" && password==="adminCod3r123") {
//             newUser = await userModel.create({...req.body,password:createHash(password), role:"admin"})
//         }else{
//             newUser = await userModel.create ({...req.body,password:createHash(password), role:"usuario"})
//         }
//         done(null, newUser);
//       } catch (error) {
//         done(new Error(`Ocurrio un error durante la autenticacion ${error.message} 😨.`));
//       }
//     }));
  
//     passport.use('login', new LocalStrategy(opts, async (req, email, password, done) => {
//       try {
//         const user = await userModel.findOne({ email });
//         if (!user) {
//           return done(new Error('Correo o contraseña invalidos 😨'));
//         }
//         const isPassValid = isValidPassword(password, user);
//         if (!isPassValid) {
//           return done(new Error('Correo o contraseña invalidos 😨'));
//         }
//         const token = tokenGenerator(user)
//         newUser= [{user, token}]
//         done(null, newUser);
//       } catch (error) {
//         done(new Error(`Ocurrio un error durante la autenticacion ${error.message} 😨.`));
//       }
//     }));

//     passport.use('github', new GithubStrategy(githubOpts, async (accessToken, refreshToken, profile, done) => {
//       console.log('profile', profile);
//       let email = profile._json.email;
//       if (!email) { 
//         let data = await fetch('https://api.github.com/user/public_emails', {
//           headers: {
//             Authorization: `token ${accessToken}`,
//           },
//         });
//         data = await data.json();
//         console.log('data', data);
//         const target = data.find((item) => item.primary && item.verified);
//         email = target.email;
//       } 
//       let user = await userModel.findOne({ email });
//       if (user) {
//         return done(null, user);
//       }
//       user = {
//         first_name: profile.username,
//         last_name: '',
//         email,
//         age: 18,
//         password: '',
//         provider: 'Github',
//         role: "usuario"
//       };
  
//       const newUser = await userModel.create(user);
//       done(null, newUser);
//     }));
  
//     passport.serializeUser((user, done) => {
//       done(null, user._id);
//     });
  
//     passport.deserializeUser(async (uid, done) => {
//       const user = await userModel.findById(uid);
//       done(null, user);
//     });
//   }