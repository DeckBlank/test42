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
app.use(express.static('./public/'));
app.use(cors(corsOptions));
app.get("/productos", function (req, res) {
  let path = "index.html";
  res.sendFile(path, { root: './public/' });
});

io.on('connect', (client) => {
  /* client.broadcast.emit('mensaje', 'Desde el server') */
  console.log('cliente',client.id)
  /* client.on('mensaje del chat', (message) => {
      console.log(message)
      io.emit('mensaje del chat', message)
  }) */
  console.log(Usuarios.nuevaConexion(client.id));
  client.on('disconnect', function () {
    console.log('adios',client.id)
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
  client.on('chat',(mensaje)=>{
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
      Usuarios.guardar(mensajeChat)
    }
    
  })
})






const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Aplicacion en puerto ${PORT}`);
});

import { productos,routeUsuarios } from "./routes";

app.use("/api/productos", productos,(req,res,next)=>{
  let message = req.message;
  console.log(message)
  io.sockets.emit('mensaje', message);
});


 app.use("/usuarios", routeUsuarios);

/*
console.log(
  
  Usuarios.newUser({
    id:'algo',
    email:'aaaa',
    fecha:'121212',
    mensaje:'aaaaaa'
  })
);
console.log(
  
  Usuarios.newUser({
    id:'algo',
    email:'aaaa',
  })
);

console.log( 
  Usuarios.guardar(
    {
      email:'aaaa',
      fecha:'121212',
      mensaje:'aaaaaa'
    }
  )
); */