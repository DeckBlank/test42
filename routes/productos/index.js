import express from 'express'
/* import {Productos}  from '../../utils/productos' */
import {NewProductos}  from '../../persistencia/layersProductos/factory.js'

import {getFakeProducts}  from '../../generador/productos'

export const productos = express.Router()

productos.get('/',async (req,res)=>{
    res.json(await NewProductos.getItems())
})
productos.get('/test',async (req,res)=>{
    let cant = req.query.cant
    res.json(getFakeProducts(cant))
})

productos.get('/:id',async (req,res)=>{
    let id = req.params.id
    res.json(await NewProductos.getItemsById(id))
})

productos.post('/',async (req,res,next)=>{
    let body = req.body
    res.json(await NewProductos.addItem(body))
    req.message = await NewProductos.getItems();
    next()
})

productos.put('/:id',async (req,res,next)=>{
    let body = req.body
    res.json(await NewProductos.putItemById(body));
    req.message = await NewProductos.getItems();
    next()
})

productos.delete('/:id',async (req,res,next)=>{
    let id = req.params.id
    res.json(await NewProductos.deleteItemById(id));
    req.message = await NewProductos.getItems();
    next()
})


