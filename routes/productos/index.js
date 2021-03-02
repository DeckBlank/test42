import express from 'express'
import {Productos}  from '../../utils/productos'
export const productos = express.Router()

productos.get('/',(req,res)=>{
    res.json(Productos.getItems())
})

productos.get('/:id',(req,res)=>{
    let id = req.params.id
    res.json(Productos.getItemsById(id))
})

productos.post('/',(req,res,next)=>{
    let body = req.body
    res.json(Productos.addItem(body))
    req.message = Productos.getItems();
    next()
})

productos.put('/:id',(req,res,next)=>{
    let body = req.body
    res.json(Productos.putItemById(body));
    req.message = Productos.getItems();
    next()
})

productos.delete('/:id',(req,res,next)=>{
    let id = req.params.id
    res.json(Productos.deleteItemById(id));
    req.message = Productos.getItems();
    next()
})


