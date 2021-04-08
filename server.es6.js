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
app.use(express.static('./frontendreact/build/'));
app.use(cors(corsOptions));
app.get("/productos/*", function (req, res) {
  let path = "index.html";
  res.sendFile(path, { root: './frontendreact/build/' });
});

io.on('connect', (client) => {
  console.log('cliente',client.id)
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

app.use("/api/productos", productos,(req,res,next)=>{
  let message = req.message;
  io.sockets.emit('mensaje', message);
});



 app.use("/chat", routeChat);