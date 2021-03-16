import express from 'express'
import {Usuarios} from '../../utils/usuarios'
export const routeChat = express.Router();

routeChat.get('/',async (req,res,next)=>{
    let respuesta = await Usuarios.leer('sqlite')
    console.log(respuesta);
    //let log = JSON.parse(respuesta)
    res.json(respuesta)
    next();
})