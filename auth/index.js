import * as facebook from './facebook'
import * as local from './local'


import passport from "passport";
/* import {facebook,local} from './auth' */

import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as FacebookStrategy } from "passport-facebook";
passport.use("login",new LocalStrategy(local.config,local.loginCallback));
passport.use("register",new LocalStrategy(local.config,local.callback));
passport.use(new FacebookStrategy(facebook.credenciales,facebook.callback));

export {
    passport
}