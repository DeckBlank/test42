import dotenv from "dotenv";
dotenv.config();
import express from "express";
import socketIO from 'socket.io'
import {startSocket} from './socket' 
import cors from 'cors'
import corsOptions from './config/cors.js'
import {Usuarios} from './utils/usuarios'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from "passport";
import bCrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "./models/user.js";

const app = express();
import http  from 'http'
const server = http.createServer(app)
const io = socketIO(server)
app.use(express.json());
app.use(cors(corsOptions));

app.use(cookieParser())
app.use(session({
    secret: 'supersecreta',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 600000
    },
    store:MongoStore.create({ mongoUrl: process.env.DB_BDG })
}))
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "nombre",
      passReqToCallback: true,
    },
    (req, nombre, password, cb) => {
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
  )
);


const validatePassword = (user, password) => {
  return bCrypt.compareSync(password, user.password);
};

passport.use(
  "register",
  new LocalStrategy(
    {
      usernameField: "nombre",
      passReqToCallback: true,
    },
    function (req, nombre, password, cb) {
      
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
  )
);

var createHash = function (password) {
  return bCrypt.hashSync(password.toString(), bCrypt.genSaltSync(10), null);
};

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

app.post(
  "/login",passport.authenticate("login"), //, { failureRedirect: "/login" }
  (req, res) => {
    console.log(req.user.nombre);
    res.json(req.user.nombre);
  }
);
app.post("/register",passport.authenticate("register"), // , { failureRedirect: "/failregister" }
  (req, res) => {
    console.log(req.user.nombre);
    res.json(req.user.nombre);
  }
);
const sessionMiddleware = (req,res,next)=>{
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    next();
  } else {
    res.sendStatus(401)
  }
 }

io.on('connect', (client) => {
  client.on('disconnect', function () {
    console.log(Usuarios.deleteUser(client.id));
  });
  client.on('registrarse',(email)=>{
    let estado = Usuarios.newUser(email,client.id)
    console.log(estado,client.id);
    if(estado ===true){
      io.sockets.emit(client.id,{message:'email aceptado'})
    }else{
      io.sockets.emit('error',{message:'email ya usado'})
    }
    
  })
  client.on('chat',async (mensaje)=>{
    let email = Usuarios.getEmailbyId(client.id)
    if(email===''){
      console.log({message:'usuario no registrado'});
      io.sockets.emit('error',{message:'usuario no registrado'})
    }else{
      let mensajeChat = {
        email,
        fecha:new Date(),
        mensaje
      }
      let guardado = await Usuarios.guardar(mensajeChat,'sqlite')
      io.sockets.emit('resp-chat',guardado)
    }
    
  })
})


const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Aplicacion en puerto ${PORT}`);
});

import { productos,routeChat } from "./routes";

app.use("/api/productos", sessionMiddleware, productos,(req,res,next)=>{
  let message = req.message;
  io.sockets.emit('mensaje', message);
});

app.use("/chat",
 sessionMiddleware,
 routeChat);

app.post('/logout', (req,res) => {
  const { nombre } = req.user;
  req.logout();
  res.json(nombre)
})

app.use(express.static('./frontendreact/build/'));
app.get("/*", function (req, res) {
  let path = "index.html";
  res.sendFile(path, { root: './frontendreact/build/' });
});