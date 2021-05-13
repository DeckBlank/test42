import express from 'express'
import {fork} from 'child_process'

export const randoms = express.Router();

randoms.get('/',(req,res)=>{
    let cant = req.query.cant
    const forked = fork('./utils/globals.js');
    forked.on('message',msj=>{
        res.json(msj)
    })
    forked.send(cant);
})