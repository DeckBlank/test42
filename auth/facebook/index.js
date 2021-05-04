import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import express from 'express'
export const route = express.Router()
import { User } from "../../models/user.js";


route.get("/", (req,res,next)=>{
    console.log('entro faceboook ');
    next();
    },passport.authenticate("facebook"));
    
route.get("/callback",
    passport.authenticate("facebook"), //, { failureRedirect: "/login" }
    function (req, res) {
        console.log(req.user);
        console.log('entro perro');
        // Successful authentication, redirect home.
        res.redirect("/");
    }
);

export const credenciales = {
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
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