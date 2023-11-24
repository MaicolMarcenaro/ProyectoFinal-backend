import userModel from "../models/user.model.js";
import { createHash, isValidPassword } from "../utils.js";
import passport from 'passport'
import {Strategy as LocalStrategy} from 'passport-local'
import { Strategy as GithubStrategy } from 'passport-github2';

const opts = {
    usernameField: 'email',
    passReqToCallback: true,
}
const githubOpts = {
  clientID: 'Iv1.bf50fd786116c829', 
  clientSecret: '9fca9b70ec04ed2cf5a8f56c83f03a0011797fa5',
  callbackURL: "http://localhost:8080/api/sessions/github/callback", 
};

export const init = () => {
    passport.use('register', new LocalStrategy(opts, async (req, email, password, done) => {
      try {
        const user = await userModel.findOne({ email });
        if (user) {
          return done(new Error('User already register 😨'));
        }
        if (email==="adminCoder@coder.com" && password==="adminCod3r123") {
            const newUser = {...req.body,password:createHash(body.password), role:"admin"}
            await userModel.create(newUser)
        }else{
            const newUser = {...req.body,password:createHash(body.password), role:"usuario"}
            await userModel.create(newUser)
        }
        done(null, newUser);
      } catch (error) {
        done(new Error(`Ocurrio un error durante la autenticacion ${error.message} 😨.`));
      }
    }));
  
    passport.use('login', new LocalStrategy(opts, async (req, email, password, done) => {
      try {
        const user = await userModel.findOne({ email });
        if (!user) {
          return done(new Error('Correo o contraseña invalidos 😨'));
        }
        const isPassValid = isValidPassword(password, user);
        if (!isPassValid) {
          return done(new Error('Correo o contraseña invalidos 😨'));
        }
        done(null, user);
      } catch (error) {
        done(new Error(`Ocurrio un error durante la autenticacion ${error.message} 😨.`));
      }
    }));

    passport.use('github', new GithubStrategy(githubOpts, async (accessToken, refreshToken, profile, done) => {
      let email = profile._json.email;
      let user = await userModel.findOne({ email });
      if (user) {
        return done(null, user);
      }
      user = {
        first_name: profile._json.name,
        last_name: '',
        email,
        age: 18,
        password: '',
        provider: 'Github',
      };
  
      const newUser = await userModel.create(user);
      done(null, newUser);
    }));
  
    passport.serializeUser((user, done) => {
      done(null, user._id);
    });
  
    passport.deserializeUser(async (uid, done) => {
      const user = await userModel.findById(uid);
      done(null, user);
    });
  }