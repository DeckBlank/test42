import express from 'express'
import {Usuarios} from '../../utils/usuarios'
export const routeUsuarios = express.Router();

routeUsuarios.post('/',async (req,res,next)=>{
    res.json(Usuarios.newUser(req.body))
    next();
})