import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import express from 'express'
export const route = express.Router()
import { User } from "../../models/user.js";


route.get("/", (req,res,next)=>{
    next();
    },passport.authenticate("facebook"));
    
route.get("/callback",
    passport.authenticate("facebook"), 
    function (req, res) {
      console.log(req);
        console.log(req.user);
        res.redirect('/');

    }
);

export const credenciales = {
    clientID: process.env.clientID  || process.argv[3],
    clientSecret: process.env.clientSecret || process.argv[4],
    callbackURL: process.env.callbackURL,
}


passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  
  passport.deserializeUser((id, done) => {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
export const callback = function (accessToken, refreshToken, profile, cb) {
    const findOrCreateUser = function () {
      console.log(41,profile,cb);
      User.findOne({ facebookId: profile.id }, function (err, user) {
        if (err) {
          console.log("Error in SignUp: " + err);
          return cb(err);
        }
        if (user) {
          console.log("User already exists");
          return cb(null, user);
        } else {
          var newUser = new User();
          newUser.facebookId = profile.id;
          newUser.nombre = profile.displayName;
          newUser.save((err) => {
            if (err) {
              console.log("Error in Saving user: " + err);
              throw err;
            }
            console.log("User Registration succesful");
            return cb(null, newUser);
          });
        }
      });
    };
    process.nextTick(findOrCreateUser);
  }