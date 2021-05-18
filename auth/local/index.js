import passport from "passport";
import express from 'express'
export const route = express.Router()
import { User } from "../../models/user.js";
import bCrypt from "bcrypt";

route.post(
    "/login",passport.authenticate("login"), 
    (req, res) => {
      res.json(req.user.nombre);
    }
  );
  route.post("/register", 
  (req, res,next) => {
    next();
  },
  passport.authenticate("register"), 
    (req, res) => {
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
        return cb(err);
      }
      if (user) {
        return cb(null, false);
      } else {
        var newUser = new User();
        newUser.nombre = nombre;
        newUser.password = createHash(password);
        newUser.save((err) => {
          if (err) {
            throw err;
          }
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
        return cb(null, false);
      }
      if (!validatePassword(user, password)) {
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