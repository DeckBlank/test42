import * as dotenv from "dotenv";
dotenv.config();
import  {Request, Response , Next} from "express";
import  * as express from "express";
/* import * as io from 'socket.io' */
/* import * as  startSocket from './socket'  */
import * as  cors from 'cors'
import * as  corsOptions from './config/cors.js'
import {Usuarios}  from './utils/usuarios'
import * as http  from 'http'

const app = express();
const server = http.createServer(app)
const io = require("socket.io")(server);

app.use(express.json());
app.use(express.static('./frontendreact/build/'));

app.get("/productos", function (req:Request, res:Response) {
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
    client.on('registrarse',(email:string)=>{
      let estado = Usuarios.newUser(email,client.id)
      console.log(estado,client.id);
      if(estado ===true){
        io.sockets.emit(client.id,{message:'email aceptado'})
      }else{
        io.sockets.emit('error',{message:'email ya usado'})
      }
      
    })
    client.on('chat',async (mensaje:string)=>{
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
        let guardado = await Usuarios.guardar(mensajeChat)
        io.sockets.emit('resp-chat',guardado)
      }
      
    })
  })

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Aplicacion en puerto ${PORT}`);
});



import {productos} from "./routes/index.js";
import {routeChat} from "./routes/index.js";

app.use("/api/productos", productos,(req:Request, res:Response,next:Next)=>{
  let message:string = req.message;
  io.sockets.emit('mensaje', message);
});


 app.use("/chat", routeChat);

