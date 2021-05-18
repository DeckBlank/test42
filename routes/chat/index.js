import express from 'express'
import {Usuarios} from '../../utils/usuarios'
export const routeChat = express.Router();

routeChat.get('/',async (req,res,next)=>{
    let respuesta = await Usuarios.leer('sqlite')
    res.json(respuesta)
})