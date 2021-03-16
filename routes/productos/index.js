import express from 'express'
import {Productos}  from '../../utils/productos'
export const productos = express.Router()

productos.get('/',async (req,res)=>{
    res.json(await Productos.getItems())
})

productos.get('/:id',async (req,res)=>{
    let id = req.params.id
    res.json(await Productos.getItemsById(id))
})

productos.post('/',async (req,res,next)=>{
    let body = req.body
    res.json(await Productos.addItem(body))
    req.message = await Productos.getItems();
    next()
})

productos.put('/:id',async (req,res,next)=>{
    let body = req.body
    res.json(await Productos.putItemById(body));
    req.message = await Productos.getItems();
    next()
})

productos.delete('/:id',async (req,res,next)=>{
    let id = req.params.id
    res.json(await Productos.deleteItemById(id));
    req.message = await Productos.getItems();
    next()
})


