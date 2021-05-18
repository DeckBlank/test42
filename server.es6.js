import dotenv from "dotenv";
dotenv.config();
import express from "express";
import socketIO from 'socket.io'
import morgan from 'morgan'
import {startSocket} from './socket' 
import cors from 'cors'
import corsOptions from './config/cors.js'
import {Usuarios} from './utils/usuarios'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from "passport";

import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as FacebookStrategy } from "passport-facebook";
import {facebook,local} from './auth'
import http  from 'http'
import compression from 'compression'

import {logger} from './config/logger'

const app = express();

app.use(compression({ filter: shouldCompress }))
 
function shouldCompress (req, res) {
  // compresion para todas las rutas menos para /info
  // comparar con su verion comprimida /info/compression
  if (req._parsedOriginalUrl.path==='/info') {
    return false
  }
  return compression.filter(req, res)
}


const server = http.createServer(app)
const io = socketIO(server)
app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan('tiny'));
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
passport.use("login",new LocalStrategy(local.config,local.loginCallback));
passport.use("register",new LocalStrategy(local.config,local.callback));

passport.use(new FacebookStrategy(facebook.credenciales,facebook.callback));

app.use("/auth/facebook",facebook.route);
app.use("/auth",local.route);


const sessionMiddleware = (req,res,next)=>{
  if (req.isAuthenticated()) {
    next();
  } else {
    res.sendStatus(401)
  }
}
app.get('/user',sessionMiddleware,(req,res)=>{
  res.json(req.user)
})


io.on('connect', (client) => {
  client.on('disconnect', function () {
  });
  client.on('registrarse',(email)=>{
    let estado = Usuarios.newUser(email,client.id)
    if(estado ===true){
      io.sockets.emit(client.id,{message:'email aceptado'})
    }else{
      io.sockets.emit('error',{message:'email ya usado'})
    }
    
  })
  client.on('chat',async (mensaje)=>{
    let email = Usuarios.getEmailbyId(client.id)
    if(email===''){
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


const PORT = process.env.PORT || process.argv[2];

server.listen(PORT, () => {
  logger.info(`Aplicacion en puerto ${PORT}`);
});

import { productos,routeChat ,info,randoms} from "./routes";

app.use("/info", info);
app.use("/randoms", randoms);


app.use("/api/productos", sessionMiddleware, productos,(req,res,next)=>{
  let message = req.message;
  io.sockets.emit('mensaje', message);
});

app.use("/chat",
 sessionMiddleware,
 routeChat);

app.post('/logout',sessionMiddleware, (req,res) => {
    const { nombre } = req.user;
    req.logout();
    res.json(nombre);
})

app.use(express.static('./frontendreact/build/'));
app.get("/*", function (req, res) {
  let path = "index.html";
  res.sendFile(path, { root: './frontendreact/build/' });
});