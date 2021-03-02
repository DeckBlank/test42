import express from 'express'
import {Usuarios} from '../../utils/usuarios'
export const routeChat = express.Router();

routeChat.get('/',async (req,res,next)=>{
    let log = JSON.parse(await Usuarios.leer())
    res.json(log)
    next();
})