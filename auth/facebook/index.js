import { enviroment } from "../../config/enviroment.js";
import passport from "passport";
import { User } from "../../models/user.js";



export const credenciales = {
    clientID: enviroment.clientID  || process.argv[3],
    clientSecret: enviroment.clientSecret || process.argv[4],
    callbackURL: enviroment.callbackURL,
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