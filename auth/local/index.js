import passport from "passport";
import express from 'express'
export const route = express.Router()
import { User } from "../../models/user.js";
import bCrypt from "bcrypt";

route.post(
    "/login",passport.authenticate("login"), 
    (req, res) => {
      console.log(req.user.nombre);
      res.json(req.user.nombre);
    }
  );
  route.post("/register", 
  (req, res,next) => {
    console.log(32,req.body);
    next();
  },
  passport.authenticate("register"), 
    (req, res) => {
      console.log(req.user.nombre);
      res.json(req.user.nombre);
    }
  );

export const config = {
    usernameField: "nombre",
    passReqToCallback: true,
  }


passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  
  passport.deserializeUser((id, done) => {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
export const callback = function (req, nombre, password, cb) {
  const findOrCreateUser = function () {
    User.findOne({ nombre: nombre },function (err, user) {
      if (err) {
        console.log("Error in SignUp: " + err);
        return cb(err);
      }
      if (user) {
        console.log("User already exists");
        return cb(null, false);
      } else {
        var newUser = new User();
        newUser.nombre = nombre;
        newUser.password = createHash(password);
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

export const loginCallback = (req, nombre, password, cb) => {
    User.findOne({ nombre: nombre }, (err, user) => {
      if (err) {
        return done(err);}
      if (!user) {
        console.log("User Not Found with nombre " + nombre);
        return cb(null, false);
      }
      if (!validatePassword(user, password)) {
        console.log("Invalid Password");
        return cb(null, false);
      }
      return cb(null, user);
    });
  }

var createHash = function (password) {
    return bCrypt.hashSync(password.toString(), bCrypt.genSaltSync(10), null);
  };

  const validatePassword = (user, password) => {
    return bCrypt.compareSync(password, user.password);
  };