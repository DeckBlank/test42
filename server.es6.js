import dotenv from "dotenv";
dotenv.config();
import express from "express";
import socketIO from 'socket.io'
import {startSocket} from './socket' 
import cors from 'cors'
import corsOptions from './config/cors.js'
import {Usuarios} from './utils/usuarios'

const app = express();
import http  from 'http'
const server = http.createServer(app)
const io = socketIO(server)
app.use(express.json());
app.use(cors(corsOptions));
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'

app.use(cookieParser())
app.use(session({
    secret: 'supersecreta',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 60000
    },
    store:MongoStore.create({ mongoUrl: process.env.DB_BDG })
}))

const sessionMiddleware = (req,res,next)=>{
  if(req.session.nombre){
    next();
  }else{
    res.sendStatus(401)
  }
 }

io.on('connect', (client) => {
  client.on('disconnect', function () {
    console.log(45,Usuarios.deleteUser(client.id));
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
    console.log('cliente',mensaje,client.id,email)
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

 app.use("/chat", sessionMiddleware,routeChat);

app.post('/login', (req,res) => {
  let { nombre } = req.body
  req.session.nombre = nombre
  res.json(nombre)
})

app.post('/logout', (req,res) => {
  console.log('salio',req.session.nombre)
  let nombre  = req.session.nombre;
  req.session.destroy( );
  res.json(nombre)
})

app.use(express.static('./frontendreact/build/'));
app.get("/*", function (req, res) {
  let path = "index.html";
  res.sendFile(path, { root: './frontendreact/build/' });
});