import { enviroment } from "./config/enviroment";
import express from "express";
import socketIO from 'socket.io'
import morgan from 'morgan'
import {socketFlow} from './socket' 
import cors from 'cors'
import corsOptions from './config/cors.js'
import cookieParser from 'cookie-parser'
import session from './config/session'
import {passport} from './auth'
import http  from 'http'
import compression from 'compression'

import {logger} from './config/logger'
import { graphqlHTTP } from "express-graphql";
import { schema,rootValue } from "./graphql";

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
app.use(session())
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());



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

const sock = new socketFlow(io);
io.on('connect', sock.api)



const PORT = enviroment.PORT || 8080;

server.listen(PORT, () => {
  logger.info(`Aplicacion en puerto ${PORT}`);
});

import { productos,routeChat ,info,randoms,local,facebook } from "./routes";

app.use('/auth',local)
app.use('/facebook',facebook)

app.use("/info", info);
app.use("/randoms", randoms);

app.use("/api/productos", sessionMiddleware, productos,(req,res,next)=>{ //
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

app.use('/core',graphqlHTTP({
  schema:schema,
  rootValue:rootValue,
  graphiql:true
}))


app.use(express.static('./frontendreact/build/'));
app.get("/*", function (req, res) {
  let path = "index.html";
  res.sendFile(path, { root: './frontendreact/build/' });
});